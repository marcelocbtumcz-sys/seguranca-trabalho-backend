const db = require("../db");

// 🔹 Cadastrar EPI
exports.cadastrarEpi = async (req, res) => {
  try {
    const { epi, ca, compra, validade, estoque } = req.body;
    if (!epi || !ca) {
      return res.status(400).json({ erro: "EPI e CA são obrigatórios" });
    }

    const estoqueVal = Number(estoque) || 0;

    const sql = "INSERT INTO epi (epi, ca, compra, validade, estoque) VALUES (?, ?, ?, ?, ?)";
    const [result] = await db.query(sql, [epi, ca, compra || null, validade || null, estoqueVal]);

    res.status(201).json({ sucesso: true, id: result.insertId });
  } catch (err) {
    console.error("❌ Erro ao cadastrar EPI:", err);
    res.status(500).json({ erro: "Erro no servidor" });
  }
};

// 🔹 Listar EPIs
exports.listarEpis = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT idepi, epi, ca, compra, validade, estoque FROM epi ORDER BY idepi DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error("❌ Erro ao buscar EPIs:", err);
    res.status(500).json({ erro: "Erro no servidor" });
  }
};

// 🔹 Editar EPI
exports.editarEpi = async (req, res) => {
  try {
    const { idepi } = req.params;
    const { epi, ca, compra, validade, estoque } = req.body;

    if (!epi || !ca) {
      return res.status(400).json({ erro: "EPI e CA são obrigatórios" });
    }

    const estoqueVal = (typeof estoque !== "undefined" && estoque !== null) ? Number(estoque) : null;

    const sql = "UPDATE epi SET epi = ?, ca = ?, compra = ?, validade = ?, estoque = ? WHERE idepi = ?";
    const [result] = await db.query(sql, [epi, ca, compra || null, validade || null, estoqueVal, idepi]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: "EPI não encontrado" });
    }

    res.json({ sucesso: true });
  } catch (err) {
    console.error("❌ Erro ao editar EPI:", err);
    res.status(500).json({ erro: "Erro no servidor" });
  }
};

// 🔹 Excluir EPI
exports.excluirEpi = async (req, res) => {
  try {
    const { idepi } = req.params;

    const sql = "DELETE FROM epi WHERE idepi = ?";
    const [result] = await db.query(sql, [idepi]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: "EPI não encontrado" });
    }

    res.json({ mensagem: "✅ EPI excluído com sucesso" });
  } catch (err) {
    console.error("❌ Erro ao excluir EPI:", err);
    res.status(500).json({ erro: "Erro no servidor" });
  }
};
