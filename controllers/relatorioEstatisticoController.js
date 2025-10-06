const db = require("../db");
const PDFDocument = require("pdfkit");
const path = require("path");

// ------------------ RELATÓRIO ESTATÍSTICO GERAL ------------------
exports.getRelatorioEstatisticoGeral = async (req, res) => {
  try {
    const { ano } = req.query;
    if (!ano) {
      return res.status(400).json({ error: "Ano é obrigatório" });
    }

    const meses = [
      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    const sql = `
      SELECT CAST(SUBSTRING(data_acidente, 6, 2) AS UNSIGNED) AS mes_num,
             COUNT(*) AS total
      FROM cadastro
      WHERE LEFT(data_acidente, 4) = ?
      GROUP BY mes_num
      ORDER BY mes_num
    `;
    const [rows] = await db.query(sql, [ano]);

    const dadosMap = {};
    rows.forEach(r => {
      dadosMap[r.mes_num] = r.total;
    });

    const resultado = meses.map((nome, i) => ({
      label: nome,
      total: dadosMap[i + 1] || 0
    }));

    res.json(resultado);
  } catch (err) {
    console.error("❌ Erro no relatório estatístico geral:", err);
    res.status(500).json({ error: "Erro no relatório estatístico geral" });
  }
};
