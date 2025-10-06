const db = require("../db");
const PDFDocument = require("pdfkit");
const path = require("path");

// ------------------ RELATÓRIO ESTATÍSTICO POR FUNÇÃO ------------------
exports.getRelatorioEstatisticoFuncao = async (req, res) => {
  try {
    const { ano } = req.query;
    let sql = `
      SELECT funcao AS label, COUNT(*) AS total
      FROM cadastro
      WHERE 1=1
    `;
    const params = [];

    if (ano) {
      sql += " AND LEFT(data_acidente, 4) = ?";
      params.push(ano);
    }

    sql += " GROUP BY funcao ORDER BY total DESC";

    const [rows] = await db.query(sql, params);
    res.json(rows.length > 0 ? rows : []);
  } catch (err) {
    console.error("❌ Erro no relatório estatístico por função:", err);
    res.status(500).json({ error: "Erro no relatório estatístico por função" });
  }
};
