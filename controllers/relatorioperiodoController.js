const db = require("../db");
const PDFDocument = require("pdfkit");
const path = require("path");

// 🔹 converte DD/MM/YYYY -> YYYY-MM-DD
function parseDataBRtoISO(dataBR) {
  const partes = dataBR.split("/");
  if (partes.length !== 3) return dataBR; // se já vier ISO, não quebra
  const [dia, mes, ano] = partes;
  return `${ano}-${mes.padStart(2, "0")}-${dia.padStart(2, "0")}`;
}

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

exports.gerarRelatorioPeriodo = async (req, res) => {
  try {
    const { inicio, fim } = req.query;
    if (!inicio || !fim) {
      return res.status(400).json({ error: "Datas início e fim são obrigatórias" });
    }

    const inicioISO = parseDataBRtoISO(inicio);
    const fimISO = parseDataBRtoISO(fim);

    const [rows] = await db.query(
      `SELECT relatorio, matricula, nome, setor, funcao, data_acidente, descricao_acidente
       FROM cadastro
       WHERE data_acidente BETWEEN ? AND ?
       ORDER BY data_acidente DESC`,
      [inicioISO, fimISO]
    );

    if (rows.length === 0) {
      return res.json([]); // sem registros
    }

    const doc = new PDFDocument({ margin: 40 });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline; filename=relatorio_periodo.pdf");
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

doc.font("Helvetica-Bold").fontSize(16)
  .text("Relatório de Acidentes por Período", { align: "center" });

doc.font("Helvetica").fontSize(12)
  .text(`De ${formatDate(inicioISO)} até ${formatDate(fimISO)}`, { align: "center" });

doc.moveDown(1.5);

    // =================== LISTAGEM ===================
    doc.fontSize(12);
    rows.forEach((r, i) => {
      doc.font("Helvetica-Bold").text(`${i + 1}. Nome: `, { continued: true });
      doc.font("Helvetica").text(r.nome || "Não informado");
      doc.moveDown(0.6);

      doc.font("Helvetica-Bold").text("Matrícula: ", { continued: true });
      doc.font("Helvetica").text(r.matricula || "Não informado");
      doc.moveDown(0.6);

      doc.font("Helvetica-Bold").text("Setor: ", { continued: true });
      doc.font("Helvetica").text(r.setor || "Não informado");
      doc.moveDown(0.6);

      doc.font("Helvetica-Bold").text("Função: ", { continued: true });
      doc.font("Helvetica").text(r.funcao || "Não informado");
      doc.moveDown(0.6);

      doc.font("Helvetica-Bold").text("Data do Acidente: ", { continued: true });
      doc.font("Helvetica").text(formatDate(r.data_acidente) || "Não informado");
      doc.moveDown(0.6);

      doc.font("Helvetica-Bold").text("Descrição: ", { continued: true });
      doc.font("Helvetica").text(r.descricao_acidente || "Não informado", {
        width: 500,
        align: "justify"
      });

      doc.moveDown(1.6);
    });

    doc.end();
  } catch (err) {
    console.error("❌ Erro no relatório por período:", err);
    res.status(500).json({ error: "Erro no relatório por período" });
  }
};
