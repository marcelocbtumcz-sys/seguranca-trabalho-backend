const db = require("../db");

// 🔹 Listar usuários
exports.listarUsuarios = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT id, nome, usuario, email FROM usuario");
    res.json(rows);
  } catch (err) {
    console.error("❌ Erro ao buscar usuários:", err);
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
};

// 🔹 Cadastrar usuário
exports.cadastrarUsuario = async (req, res) => {
  try {
    const { nome, usuario, email, senha } = req.body;

    if (!nome || !usuario || !email || !senha) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    const sql = "INSERT INTO usuario (nome, usuario, email, senha) VALUES (?, ?, ?, ?)";
    const [result] = await db.query(sql, [nome, usuario, email, senha]);

    res.json({
      message: "✅ Usuário cadastrado!",
      id: result.insertId,
      nome,
      usuario,
      email
    });

  } catch (err) {
    console.error("❌ Erro ao salvar usuário:", err);

    if (err.code === "ER_DUP_ENTRY") {
      if (err.sqlMessage.includes("usuario_UNIQUE")) {
        return res.status(400).json({ error: "⚠️ Usuário já cadastrado!" });
      }
      if (err.sqlMessage.includes("email_UNIQUE")) {
        return res.status(400).json({ error: "⚠️ Email já cadastrado!" });
      }
      return res.status(400).json({ error: "⚠️ Usuário ou email já cadastrados!" });
    }

    res.status(500).json({ error: "Erro ao salvar usuário" });
  }
};

// 🔹 Excluir usuário
exports.excluirUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const sql = "DELETE FROM usuario WHERE id = ?";
    const [result] = await db.query(sql, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "⚠️ Usuário não encontrado!" });
    }

    res.json({ message: "✅ Usuário excluído!" });

  } catch (err) {
    console.error("❌ Erro ao excluir usuário:", err);
    res.status(500).json({ error: "Erro ao excluir usuário" });
  }
};
