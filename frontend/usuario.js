// usuario.js
const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

const app = express();
const PORT = 3000;

// 🔹 Middleware
app.use(cors());
app.use(express.json());

// 🔹 Conexão com MySQL
const dbConfig = {
  host: "localhost",
  user: "root",       // ajuste se for outro usuário
  port: 3307,
  password: "448201",       // coloque a senha do seu MySQL se tiver
  database: "seguranca"
};

let db;
(async () => {
  try {
    db = await mysql.createPool(dbConfig);
    console.log("✅ Conectado ao MySQL!");
  } catch (err) {
    console.error("❌ Erro ao conectar no MySQL:", err);
  }
})();

// 🔹 Rota GET - listar usuários
app.get("/usuario", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT id, nome, usuario, email FROM usuario");
    res.json(rows);
  } catch (err) {
    console.error("❌ Erro ao buscar usuários:", err);
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
});

// 🔹 Rota POST - cadastrar usuário
app.post("/usuario", async (req, res) => {
  try {
    const { nome, usuario, email, senha } = req.body;

    if (!nome || !usuario || !email || !senha) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    const sql = "INSERT INTO usuario (nome, usuario, email, senha) VALUES (?, ?, ?, ?)";
    const [result] = await db.query(sql, [nome, usuario, email, senha]);

    res.json({
      message: "✅ Usuário cadastrado com sucesso!",
      id: result.insertId,
      nome,
      usuario,
      email
    });
  } catch (err) {
    console.error("❌ Erro ao salvar usuário:", err);
    res.status(500).json({ error: "Erro ao salvar usuário" });
  }
});

// 🔹 Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor de usuários rodando em http://localhost:${PORT}`);
});
