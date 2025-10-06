const db = require("../db");

// ============================
// 🔹 Salvar cadastro de acidente
// ============================
exports.salvarCadastro = async (req, res) => {
  try {
    const {
      matricula, nome, nascimento, telefone, setor, funcao,
      cnpj, empresa, tel_empresa, endereco, cep, tipo_cat,
      ult_dia, comun_policia, houve_obito, data_obito, cod_doenca,
      situacao_doenca, cod_acidente, situacao_acidente, inicia_cat,
      tipo_acidente, data_acidente, horas_trab, hora_acidente,
      cod_parte_corpo, parte_corpo, lateralidade, local_acidente,
      testemunha, sofreu_acidente, epi, descricao_acidente,
      prov_acidente, cod_agente, agente
    } = req.body;

    const anoAtual = new Date().getFullYear();

    const [rows] = await db.query(
      "SELECT relatorio FROM cadastro WHERE relatorio LIKE ? ORDER BY id DESC LIMIT 1",
      [`%/${anoAtual}`]
    );

    let numero = 1;
    if (rows.length > 0) {
      const ultimoRelatorio = rows[0].relatorio;
      const ultimoNumero = parseInt(ultimoRelatorio.split("/")[0]);
      numero = ultimoNumero + 1;
    }

    const relatorio = `${String(numero).padStart(2, "0")}/${anoAtual}`;

    const colunas = [
      "relatorio", "matricula", "nome", "nascimento", "telefone", "setor", "funcao", "cnpj", "empresa", "tel_empresa",
      "endereco", "cep", "tipo_cat", "ult_dia", "comun_policia", "houve_obito", "data_obito", "cod_doenca", "situacao_doenca",
      "cod_acidente", "situacao_acidente", "inicia_cat", "tipo_acidente", "data_acidente", "horas_trab", "hora_acidente",
      "cod_parte_corpo", "parte_corpo", "lateralidade", "local_acidente", "testemunha", "sofreu_acidente", "epi",
      "descricao_acidente", "prov_acidente", "cod_agente", "agente"
    ];

    const values = [
      relatorio, matricula, nome, nascimento, telefone, setor, funcao, cnpj, empresa, tel_empresa,
      endereco, cep, tipo_cat, ult_dia, comun_policia, houve_obito, data_obito, cod_doenca, situacao_doenca,
      cod_acidente, situacao_acidente, inicia_cat, tipo_acidente, data_acidente, horas_trab, hora_acidente,
      cod_parte_corpo, parte_corpo, lateralidade, local_acidente, testemunha, sofreu_acidente, epi,
      descricao_acidente, prov_acidente, cod_agente, agente
    ];

    const placeholders = Array(values.length).fill("?").join(", ");
    const sql = `INSERT INTO cadastro (${colunas.join(", ")}) VALUES (${placeholders})`;

    await db.query(sql, values);

    res.json({ message: "Cadastro salvo com sucesso!", relatorio });
  } catch (error) {
    console.error("❌ Erro ao salvar relatório:", error);
    res.status(500).json({ error: "Erro ao salvar relatório" });
  }
};

// ============================
// 🔹 Gerar próximo número de relatório
// ============================
exports.gerarProximoRelatorio = async (req, res) => {
  try {
    const anoAtual = new Date().getFullYear();

    const [rows] = await db.query(
      "SELECT relatorio FROM cadastro WHERE relatorio LIKE ? ORDER BY id DESC LIMIT 1",
      [`%/${anoAtual}`]
    );

    let numero = 1;
    if (rows.length > 0) {
      const ultimoRelatorio = rows[0].relatorio;
      const ultimoNumero = parseInt(ultimoRelatorio.split("/")[0]);
      numero = ultimoNumero + 1;
    }

    const proximoRelatorio = `${String(numero).padStart(2, "0")}/${anoAtual}`;
    res.json({ numeroRelatorio: proximoRelatorio });
  } catch (err) {
    console.error("❌ Erro ao gerar número do relatório:", err);
    res.status(500).json({ error: "Erro ao gerar número do relatório" });
  }
};
