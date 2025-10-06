const db = require("../db");

// 🔹 Listar acidentes
// ============================
exports.listarAcidentes = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT codigo, descricao FROM acidente");
    res.json(rows);
  } catch (err) {
    console.error("Erro ao listar acidentes:", err);
    res.status(500).json({ error: err.message });
  }
};


