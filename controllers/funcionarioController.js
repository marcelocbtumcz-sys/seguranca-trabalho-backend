const db = require("../db");

// Listar funcionários
exports.listarFuncionarios = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT matricula, nome, cargo, setor FROM funcionarios"
    );
    res.json(rows);
  } catch (err) {
    console.error("Erro ao listar funcionários:", err);
    res.status(500).json({ error: "Erro no servidor" });
  }
};
