const express = require("express");
const cors = require("cors");
const db = require("./db"); // Conexão MySQL configurada

const app = express();
app.use(cors());
app.use(express.json());

// ============================
// 🔹 Listar funcionários
// ============================
app.get("/funcionarios", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT matricula, nome, cargo, setor FROM funcionarios"
    );
    res.json(rows);
  } catch (err) {
    console.error("Erro ao listar funcionários:", err);
    res.status(500).json({ error: err.message });
  }
});

// ============================
// 🔹 Listar acidentes
// ============================
app.get("/acidentes", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT codigo, descricao FROM acidente");
    res.json(rows);
  } catch (err) {
    console.error("Erro ao listar acidentes:", err);
    res.status(500).json({ error: err.message });
  }
});

// ============================
// 🔹 Listar doenças
// ============================
app.get("/doencas", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT codigo, descricao FROM doenca");
    res.json(rows);
  } catch (err) {
    console.error("Erro ao listar doenças:", err);
    res.status(500).json({ error: err.message });
  }
});

// ============================
// 🔹 Listar partes do corpo
// ============================
app.get("/corpo", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT codigo, descricao FROM corpo");
    res.json(rows);
  } catch (err) {
    console.error("Erro ao listar partes do corpo:", err);
    res.status(500).json({ error: err.message });
  }
});

// ============================
// 🔹 Listar empresas
// ============================
app.get("/empresa", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT cnpj, nome, endereco, tel_empresa, cep FROM empresa"
    );
    res.json(rows);
  } catch (err) {
    console.error("Erro ao listar empresas:", err);
    res.status(500).json({ error: err.message });
  }
});

// ============================
// 🔹 Cadastro de Acidente
// ============================
app.post("/cadastro", async (req, res) => {
  try {
    const {
      matricula,
      nome,
      nascimento,
      telefone,
      setor,
      funcao,
      cnpj,
      empresa,
      tel_empresa,
      endereco,
      cep,
      tipo_cat,
      ult_dia,
      comun_policia,
      houve_obito,
      data_obito,
      cod_doenca,
      situacao_doenca,
      cod_acidente,
      situacao_acidente,
      inicia_cat,
      tipo_acidente,
      data_acidente,
      horas_trab,
      hora_acidente,
      cod_parte_corpo,
      parte_corpo,
      lateralidade,
      local_acidente,
      testemunha,
      sofreu_acidente,
      epi,
      descricao_acidente,
      prov_acidente
    } = req.body;

    // 🔹 Gera número sequencial do relatório
    const anoAtual = new Date().getFullYear();

    const [rows] = await db.query(
      "SELECT relatorio FROM cadastro WHERE relatorio LIKE ? ORDER BY id DESC LIMIT 1",
      [`%/${anoAtual}`]
    );

    let numero = 1;
    if (rows.length > 0) {
      const ultimoRelatorio = rows[0].relatorio; // ex: "05/2025"
      const ultimoNumero = parseInt(ultimoRelatorio.split("/")[0]);
      numero = ultimoNumero + 1;
    }

    const relatorio = `${String(numero).padStart(2, "0")}/${anoAtual}`;

    // 🔹 Lista de colunas
    const colunas = [
      "relatorio", "matricula", "nome", "nascimento", "telefone", "setor", "funcao", "cnpj", "empresa", "tel_empresa",
      "endereco", "cep", "tipo_cat", "ult_dia", "comun_policia", "houve_obito", "data_obito", "cod_doenca", "situacao_doenca",
      "cod_acidente", "situacao_acidente", "inicia_cat", "tipo_acidente", "data_acidente", "horas_trab", "hora_acidente",
      "cod_parte_corpo", "parte_corpo", "lateralidade", "local_acidente", "testemunha", "sofreu_acidente", "epi",
      "descricao_acidente", "prov_acidente"
    ];

    // 🔹 Valores
    const values = [
      relatorio, matricula, nome, nascimento, telefone, setor, funcao, cnpj, empresa, tel_empresa,
      endereco, cep, tipo_cat, ult_dia, comun_policia, houve_obito, data_obito, cod_doenca, situacao_doenca,
      cod_acidente, situacao_acidente, inicia_cat, tipo_acidente, data_acidente, horas_trab, hora_acidente,
      cod_parte_corpo, parte_corpo, lateralidade, local_acidente, testemunha, sofreu_acidente, epi,
      descricao_acidente, prov_acidente
    ];

    const placeholders = Array(values.length).fill("?").join(", ");
    const sql = `
      INSERT INTO cadastro (${colunas.join(", ")})
      VALUES (${placeholders})
    `;

    await db.query(sql, values);

    res.json({
      message: "Cadastro salvo com sucesso!",
      relatorio
    });
  } catch (error) {
    console.error("❌ Erro ao salvar relatório:", error);
    res.status(500).json({ error: "Erro ao salvar relatório" });
  }
});

// ============================
// 🔹 Gerar próximo número de relatório
// ============================
app.get("/gerar-relatorio", async (req, res) => {
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
});

// ============================
const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

// =============================
// 🔹 Middlewares
// =============================
app.use(cors());
app.use(express.json());

// Log de todas as requisições
app.use((req, res, next) => {
  console.log(`📡 [${req.method}] ${req.url}`);
  next();
});

// Servir arquivos estáticos (HTML/CSS/JS) da pasta frontend
app.use(express.static(path.join(__dirname, "../frontend")));

// =============================
// 🔹 Banco de Dados
// =============================
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "seguranca_trabalho",
});

// =============================
// 🔹 Iniciar Servidor
// =============================
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📂 Acesse o frontend em http://localhost:${PORT}/index.html`);
});

