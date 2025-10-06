const db = require("../db");


// ============================
// 🔹 Listar doenças
// ============================
exports.listarDoenca = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT codigo, descricao FROM doenca");
    res.json(rows);
  } catch (err) {
    console.error("Erro ao listar doenças:", err);
    res.status(500).json({ error: err.message });
  }
};


