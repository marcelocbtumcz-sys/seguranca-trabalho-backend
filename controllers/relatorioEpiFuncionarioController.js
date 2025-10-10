const db = require("../db");
const PDFDocument = require("pdfkit");
const path = require("path");
const fs = require("fs");

// 🔹 helper para formatar "YYYY-MM-DD" ou Date -> "DD/MM/YYYY"
function formatDate(value) {
  if (!value) return "";
  if (value instanceof Date) {
    return `${String(value.getDate()).padStart(2, "0")}/${String(value.getMonth() + 1).padStart(2, "0")}/${value.getFullYear()}`;
  }
  const m = value.toString().match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (m) return `${m[3]}/${m[2]}/${m[1]}`;
  return value.toString();
}

// ---------------- RELATÓRIO POR FUNCIONÁRIO ----------------
exports.relatorioEpiFuncionario = async (req, res) => {
  try {
    const { nome } = req.query;
    if (!nome) {
      return res.status(400).json({ error: "Nome do funcionário é obrigatório" });
    }

    const [rows] = await db.query(
      `SELECT nome, setor, funcao, epi, ca, entrega, validade, matricula, quantidade, vida
       FROM epi_funcionario
       WHERE nome = ? AND (devolucao IS NULL OR devolucao = '') 
       ORDER BY entrega DESC`,
      [nome]
    );

    const doc = new PDFDocument({ margin: 40 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename=relatorio_epi_${nome}.pdf`);
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

// =================== TÍTULO ===================
doc.font("Helvetica-Bold")
  .fontSize(16)
  .text(`Relatório de EPIs - ${nome}`, { align: "center" });
doc.moveDown(2);

// 🔹 Caso o funcionário não tenha nenhum EPI
if (rows.length === 0) {
  doc.font("Helvetica").fontSize(12)
    .text("Funcionário sem EPI cadastrado.", { align: "center" });
  doc.end();
  return;
}

    // =================== DADOS FIXOS DO FUNCIONÁRIO ===================
    doc.font("Helvetica-Bold").fontSize(12).text("Matrícula: ", { continued: true });
    doc.font("Helvetica").text(rows[0].matricula || "Não informado");
    doc.moveDown(0.6);

    doc.font("Helvetica-Bold").text("Setor: ", { continued: true });
    doc.font("Helvetica").text(rows[0].setor || "Não informado", { continued: true });
    doc.font("Helvetica-Bold").text("   Função: ", { continued: true });
    doc.font("Helvetica").text(rows[0].funcao || "Não informado");
    doc.moveDown(1.2);

    // Linha separadora
    let y = doc.y;
    doc.moveTo(40, y).lineTo(550, y).strokeColor("#aaaaaa").lineWidth(1).stroke();
    doc.moveDown(1.2);

    // =================== LISTAGEM DE EPIs ===================
    rows.forEach((r) => {
      doc.font("Helvetica-Bold").text("EPI: ", { continued: true });
      doc.font("Helvetica").text(r.epi || "Não informado");
      doc.moveDown(0.6);

      doc.font("Helvetica-Bold").text("CA: ", { continued: true });
      doc.font("Helvetica").text(r.ca || "Não informado", { continued: true });

      doc.font("Helvetica-Bold").text("   Quantidade: ", { continued: true });
      doc.font("Helvetica").text(r.quantidade || "0", { continued: true });

      doc.font("Helvetica-Bold").text("   Validade: ", { continued: true });
      doc.font("Helvetica").text(formatDate(r.validade) || "Não informado", { continued: true });

      doc.font("Helvetica-Bold").text("   Data de Entrega: ", { continued: true });
      doc.font("Helvetica").text(formatDate(r.entrega) || "Não informado");
      doc.moveDown(0.6);

      doc.font("Helvetica-Bold").text("Vida Útil: ", { continued: true });
      doc.font("Helvetica").text(formatDate(r.vida) || "Não informado");
      doc.moveDown(1.2);

      // Linha separadora entre EPIs
      y = doc.y;
      doc.moveTo(40, y).lineTo(550, y).strokeColor("#aaaaaa").lineWidth(1).stroke();
      doc.moveDown(1);
    });

    doc.end();

  } catch (err) {
    console.error("❌ Erro no relatório de EPIs por funcionário:", err);
    res.status(500).json({ error: "Erro no relatório de EPIs por funcionário" });
  }
};

// ---------------- LISTAR NOMES DE FUNCIONÁRIOS ----------------
exports.getFuncionariosNomes = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT DISTINCT nome FROM epi_funcionario ORDER BY nome ASC");
    res.json(rows);
  } catch (err) {
    console.error("❌ Erro ao buscar nomes:", err);
    res.status(500).json({ error: "Erro ao buscar nomes" });
  }
};
