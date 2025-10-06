const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

// Permite receber dados JSON
app.use(express.json());

// Permite requisições de qualquer origem (Live Server)
app.use(cors());

// "Banco de dados" temporário em memória
let usuario = [];

// Rota para cadastro de usuários
app.post("/usuario", (req, res) => {
  const { nome, email, senha } = req.body;
  if (!nome || !email || !senha) {
    return res.status(400).json({ msg: "Todos os campos são obrigatórios." });
  }

  // Verifica se e-mail já existe
  const existe = usuario.find(u => u.email === email);
  if (existe) {
    return res.status(400).json({ msg: "Usuário já cadastrado com esse e-mail." });
  }

  usuario.push({ nome, email, senha });
  res.status(201).json({ msg: "Usuário cadastrado com sucesso!" });
});

// Rota inicial
app.get("/", (req, res) => {
  res.send("🚀 Sistema de Segurança do Trabalho iniciado!");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

