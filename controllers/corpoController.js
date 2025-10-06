const db = require("../db");


// ============================
// 🔹 Listar partes do corpo
// ============================
exports.listarCorpo = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT codigo, descricao FROM corpo");
    res.json(rows);
  } catch (err) {
    console.error("Erro ao listar partes do corpo:", err);
    res.status(500).json({ error: err.message });
  }
};

