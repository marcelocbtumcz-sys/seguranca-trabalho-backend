const db = require("../db");

// ------------------ LISTAR ENTREGAS ------------------
exports.listar = async (req, res) => {
  try {
    const { matricula } = req.query;
    let sql = "SELECT * FROM epi_funcionario";
    let params = [];

    if (matricula) {
      sql += " WHERE matricula = ?";
      params.push(matricula);
    }

    const [rows] = await db.query(sql, params);
    return res.json(rows);
  } catch (err) {
    console.error("Erro ao listar entregas:", err);
    return res.status(500).json({ erro: "Erro no servidor" });
  }
};

// ------------------ BUSCAR UMA ENTREGA ------------------
exports.buscarPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query(
      "SELECT * FROM epi_funcionario WHERE idepi_funcionario = ?",
      [id]
    );
    if (!rows || rows.length === 0)
      return res.status(404).json({ erro: "Entrega não encontrada" });
    return res.json(rows[0]);
  } catch (err) {
    console.error("Erro ao buscar entrega:", err);
    return res.status(500).json({ erro: "Erro no servidor" });
  }
};

// ------------------ CADASTRAR ENTREGA ------------------
exports.cadastrar = async (req, res) => {
  try {
    let {
      matricula,
      nome,
      setor,
      funcao,
      epi,
      ca,
      entrega,
      validade,
      quantidade,
      vida,
    } = req.body;

    quantidade = parseInt(quantidade) || 1;

    // Verifica estoque
    const [rowsEpi] = await db.query("SELECT estoque FROM epi WHERE epi = ?", [epi]);
    if (rowsEpi.length === 0) return res.status(400).send("EPI não encontrado");
    if (rowsEpi[0].estoque < quantidade)
      return res.status(400).send("Estoque insuficiente");

    // Insere
    const [result] = await db.query(
      "INSERT INTO epi_funcionario (matricula, nome, setor, funcao, epi, ca, entrega, validade, quantidade, vida) VALUES (?,?,?,?,?,?,?,?,?,?)",
      [matricula, nome, setor, funcao, epi, ca, entrega, validade, quantidade, vida]
    );

    // Baixa no estoque
    await db.query("UPDATE epi SET estoque = estoque - ? WHERE epi = ?", [
      quantidade,
      epi,
    ]);

    res.json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao salvar entrega");
  }
};

// ------------------ ATUALIZAR ENTREGA ------------------
exports.atualizar = async (req, res) => {
  const conn = await db.getConnection();
  try {
    const { id } = req.params;
    const {
      matricula,
      nome,
      setor,
      funcao,
      epi,
      ca,
      entrega,
      validade,
      quantidade,
      vida,
    } = req.body;

    await conn.beginTransaction();

    // Busca entrega antiga
    const [oldRows] = await conn.query(
      "SELECT * FROM epi_funcionario WHERE idepi_funcionario = ?",
      [id]
    );
    if (!oldRows.length) {
      await conn.rollback();
      return res.status(404).send("Entrega não encontrada");
    }
    const oldEntrega = oldRows[0];

    // Ajusta estoque pela diferença
    const qtdNova = parseInt(quantidade) || 1;
    const diff = qtdNova - (oldEntrega.quantidade || 0);
    if (diff > 0) {
      const [rowsEpi] = await conn.query("SELECT estoque FROM epi WHERE epi = ?", [epi]);
      if (rowsEpi[0].estoque < diff) {
        await conn.rollback();
        return res.status(400).send("Estoque insuficiente");
      }
      await conn.query("UPDATE epi SET estoque = estoque - ? WHERE epi = ?", [diff, epi]);
    } else if (diff < 0) {
      await conn.query("UPDATE epi SET estoque = estoque + ? WHERE epi = ?", [-diff, epi]);
    }

    // Se trocou o EPI
    if (oldEntrega.epi !== epi) {
      // Devolve estoque antigo
      await conn.query("UPDATE epi SET estoque = estoque + ? WHERE epi = ?", [
        oldEntrega.quantidade || 1,
        oldEntrega.epi,
      ]);

      // Baixa estoque novo
      await conn.query("UPDATE epi SET estoque = estoque - ? WHERE epi = ?", [
        qtdNova,
        epi,
      ]);
    }

    // Normaliza datas e textos
    const entregaVal =
      entrega && String(entrega).trim() !== "" ? entrega : null;
    const validadeVal =
      validade && String(validade).trim() !== "" ? validade : null;
    const vidaVal = vida && String(vida).trim() !== "" ? vida : null;

    // Atualiza
    await conn.query(
      "UPDATE epi_funcionario SET matricula=?, nome=?, setor=?, funcao=?, epi=?, ca=?, entrega=?, validade=?, vida=?, quantidade=? WHERE idepi_funcionario=?",
      [
        matricula,
        nome,
        setor,
        funcao,
        epi,
        ca,
        entregaVal,
        validadeVal,
        vidaVal,
        qtdNova,
        id,
      ]
    );

    await conn.commit();
    return res.json({ sucesso: true });
  } catch (err) {
    await conn.rollback();
    console.error("Erro ao atualizar entrega:", err);
    return res.status(500).json({ erro: err.message || "Erro no servidor" });
  } finally {
    conn.release();
  }
};

// ------------------ DELETAR ENTREGA ------------------
exports.deletar = async (req, res) => {
  const conn = await db.getConnection();
  try {
    const { id } = req.params;
    await conn.beginTransaction();

    const [rows] = await conn.query(
      "SELECT * FROM epi_funcionario WHERE idepi_funcionario = ?",
      [id]
    );
    if (!rows.length) {
      await conn.rollback();
      return res.status(404).json({ erro: "Entrega não encontrada" });
    }

    const entrega = rows[0];
    if (entrega.quantidade > 0) {
      await conn.query("UPDATE epi SET estoque = estoque + ? WHERE epi = ?", [
        entrega.quantidade,
        entrega.epi,
      ]);
    }

    await conn.query("DELETE FROM epi_funcionario WHERE idepi_funcionario = ?", [
      id,
    ]);

    await conn.commit();
    return res.json({ sucesso: true });
  } catch (err) {
    await conn.rollback();
    console.error("Erro ao excluir entrega:", err);
    return res.status(500).json({ erro: err.message || "Erro no servidor" });
  } finally {
    conn.release();
  }
};

// ------------------ MARCAR DEVOLUÇÃO ------------------
exports.marcarDevolucao = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query(
      "UPDATE epi_funcionario SET devolucao = 1 WHERE idepi_funcionario = ?",
      [id]
    );
    res.json({ mensagem: "EPI marcado como devolvido/substituído" });
  } catch (err) {
    console.error("Erro ao marcar devolução:", err);
    res.status(500).send("Erro ao marcar devolução");
  }
};   
