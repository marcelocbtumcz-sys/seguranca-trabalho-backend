const db = require("../db");
const PDFDocument = require("pdfkit");
const path = require("path");
const fs = require("fs");

// 🔹 helper: formata "YYYY-MM-DD" ou Date -> "DD/MM/YYYY"
function formatDate(value) {
  if (!value) return "";
  if (value instanceof Date) {
    const d = value;
    return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
  }
  const m = value.toString().match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (m) return `${m[3]}/${m[2]}/${m[1]}`;
  return value.toString();
}

exports.gerarRelatorioGeral = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT relatorio, matricula, nome, setor, funcao, data_acidente, descricao_acidente
       FROM cadastro
       ORDER BY data_acidente DESC`
    );

    if (rows.length === 0) {
      return res.json([]); // frontend já trata como vazio
    }

    const doc = new PDFDocument({ margin: 40 });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline; filename=relatorio_geral.pdf");
    doc.pipe(res);

   // =================== CABEÇALHO ===================
try {
  const fs = require("fs");
  const path = require("path");
  const logoPath = path.join(__dirname, "../frontend/Logo.jpg");

  if (fs.existsSync(logoPath)) {
    doc.image(logoPath, 40, 40, { height: 40 });
    doc.moveDown(5);
  } else {
    console.warn("⚠️ Logo não encontrada:", logoPath);
  }

} catch (e) {
  console.warn("⚠️ Erro ao carregar logo:", e.message);
}

doc.font("Helvetica-Bold")
  .fontSize(16)
  .text("Relatório Geral de Acidentes", { align: "center" });
doc.moveDown(2);

    // =================== DADOS ===================
    rows.forEach((r, i) => {
      doc.fontSize(12).font("Helvetica-Bold").text(`${i + 1}. Nome: `, { continued: true });
      doc.font("Helvetica").text(r.nome || "Não informado");
      doc.moveDown(0.5);

      doc.font("Helvetica-Bold").text("Matrícula: ", { continued: true });
      doc.font("Helvetica").text(r.matricula || "Não informado");
      doc.moveDown(0.5);

      doc.font("Helvetica-Bold").text("Setor: ", { continued: true });
      doc.font("Helvetica").text(r.setor || "Não informado");
      doc.moveDown(0.5);

      doc.font("Helvetica-Bold").text("Função: ", { continued: true });
      doc.font("Helvetica").text(r.funcao || "Não informado");
      doc.moveDown(0.5);

      doc.font("Helvetica-Bold").text("Data do Acidente: ", { continued: true });
      doc.font("Helvetica").text(formatDate(r.data_acidente) || "Não informado");
      doc.moveDown(0.5);

      doc.font("Helvetica-Bold").text("Descrição: ", { continued: true });
      doc.font("Helvetica").text(r.descricao_acidente || "Não informado", {
        width: 500,
        align: "justify"
      });

      doc.moveDown(2); // espaço maior entre registros
    });

    doc.end();
  } catch (err) {
    console.error("❌ Erro no relatório geral:", err);
    res.status(500).json({ error: "Erro no relatório geral" });
  }
};
