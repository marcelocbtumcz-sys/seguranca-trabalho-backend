const db = require("../db");
const PDFDocument = require("pdfkit");
const path = require("path");
const fs = require("fs");

// helper: formata "YYYY-MM-DD" ou Date -> "DD/MM/YYYY"
function formatDate(value) {
  if (!value) return "";
  if (value instanceof Date) {
    return `${String(value.getDate()).padStart(2, "0")}/${String(value.getMonth() + 1).padStart(2, "0")}/${value.getFullYear()}`;
  }
  const m = value.toString().match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (m) return `${m[3]}/${m[2]}/${m[1]}`;
  return value.toString();
}

exports.relatorioEpiGeral = async (req, res) => {
  try {
    const [rows] = await db.query(
  `SELECT idepi, epi, ca, validade, compra, estoque
   FROM epi
   WHERE estoque > 0
   ORDER BY epi ASC`
);
    if (rows.length === 0) {
      return res.json([]);
    }

    const doc = new PDFDocument({ margin: 40 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline; filename=relatorio_epi_geral.pdf");
    doc.pipe(res);

   // =================== CABEÇALHO ===================
try {
  const logoPath = path.join(__dirname, "../frontend/Logo.jpg");

  if (fs.existsSync(logoPath)) {
    doc.image(logoPath, 40, 40, { height: 40 });
    doc.moveDown(5);
  } else {
    console.warn("⚠️ Logo não encontrada:", logoPath);
  }

  doc.font("Helvetica-Bold")
    .fontSize(12)
    .text("Relatório Geral de EPIs", { align: "center" });
  doc.moveDown(2);

} catch (e) {
  console.error("⚠️ Erro ao carregar cabeçalho:", e.message);
}


    // =================== LISTAGEM ===================
    rows.forEach((r, i) => {
      doc.font("Helvetica-Bold").text(`${i + 1}. EPI: `, { continued: true });
      doc.font("Helvetica").text(r.epi || "Não informado");
      doc.moveDown(0.6);

      // CA, Validade e Compra na mesma linha
      doc.font("Helvetica-Bold").text("CA: ", { continued: true });
      doc.font("Helvetica").text(r.ca || "Não informado", { continued: true });

      doc.font("Helvetica-Bold").text("   Validade: ", { continued: true });
      doc.font("Helvetica").text(formatDate(r.validade) || "Não informado", { continued: true });

      doc.font("Helvetica-Bold").text("   Data de Compra: ", { continued: true });
      doc.font("Helvetica").text(formatDate(r.compra) || "Não informado");
      doc.moveDown(0.6);

      doc.font("Helvetica-Bold").text("Estoque: ", { continued: true });
      doc.font("Helvetica").text(r.estoque || "0");
      doc.moveDown(1.2);

      // Linha separadora
      const y = doc.y;
      doc.moveTo(40, y).lineTo(550, y).strokeColor("#aaaaaa").lineWidth(1).stroke();
      doc.moveDown(1);
    });

    doc.end();

  } catch (err) {
    console.error("❌ Erro no relatório de EPIs:", err);
    res.status(500).json({ error: "Erro no relatório de EPIs", detalhes: err.message });
  }
};
