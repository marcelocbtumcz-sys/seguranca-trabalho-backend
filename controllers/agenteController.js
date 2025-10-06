const db = require("../db");


// ============================
// 🔹 Listar agentes
// ============================
exports.listarAgente = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT codigo, descricao FROM agente");
    res.json(rows);
  } catch (err) {
    console.error("Erro ao listar agentes:", err);
    res.status(500).json({ error: err.message });
  }
};


