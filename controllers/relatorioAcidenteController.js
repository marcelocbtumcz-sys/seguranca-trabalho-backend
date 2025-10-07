const db = require("../db");
const PDFDocument = require("pdfkit");
const path = require("path");
const fs = require("fs");

// 🔹 Gerar relatório
exports.gerarRelatorio = async (req, res) => {
  try {
    const { emitente } = req.body; 
    const nomeEmitente = emitente || "Emitente não informado";

    const { relatorio } = req.params;
    const [rows] = await db.query(
      "SELECT * FROM cadastro WHERE relatorio = ?",
      [relatorio]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "⚠️ Não existem dados informados para este relatório."
      });
    }

    const dados = rows[0];

    // 🔹 helper: formata "YYYY-MM-DD" ou Date -> "DD/MM/YYYY"
    function formatDate(value) {
      if (!value) return "Não informado";
      if (value instanceof Date) {
        const d = value;
        return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
      }
      const m = value.toString().match(/^(\d{4})-(\d{2})-(\d{2})/);
      if (m) return `${m[3]}/${m[2]}/${m[1]}`;
      return value.toString();
    }

    // Função simples para título + linha à direita
    function tituloComLinhaSimples(doc, titulo) {
      if (doc.y > doc.page.height - 100) {
        doc.addPage();
      }
      doc.moveDown(1.2);
      doc.font("Helvetica-Bold").fontSize(14);

      const startX = doc.x;
      const startY = doc.y;

      doc.text(titulo, startX, startY);

      const textWidth = doc.widthOfString(titulo);
      const lineY = startY + 8;
      const rightX = doc.page.width - doc.page.margins.right;

      doc.moveTo(startX + textWidth + 8, lineY).lineTo(rightX, lineY).stroke();

      doc.moveDown(0.6);
      doc.font("Helvetica").fontSize(12);
    }

    // Criar PDF
    const doc = new PDFDocument({ margin: 40 });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `inline; filename=relatorio_${relatorio}.pdf`
    );
    doc.pipe(res);

    doc.on("pageAdded", () => {
      doc.moveDown(2);
    });

   // =================== CABEÇALHO ===================
try {
  const logoPath = path.join(__dirname, "../frontend/Logo.jpg");

  if (fs.existsSync(logoPath)) {
    doc.image(logoPath, 40, 40, { height: 40 });
  } else {
    console.warn("⚠️ Logo não encontrada:", logoPath);
  }

  const dataEmissao = new Date().toLocaleDateString("pt-BR");
  const posX = doc.page.width - doc.page.margins.right - 200;
  const posY = 40;

  // nomeEmitente pode vir de variáveis, config, ou fixo
  const { emitente } = req.body;
  const nomeEmitente = emitente || "Emitente não informado";

  doc.font("Helvetica").fontSize(10);
  doc.text(`Emitente: ${nomeEmitente}`, posX, posY, { width: 200, align: "left" });
  doc.text(`Data: ${dataEmissao}`, posX, posY + 12, { width: 200, align: "left" });

  doc.moveDown(5);
  doc.x = doc.page.margins.left;

} catch (e) {
  console.warn("⚠️ Erro ao gerar cabeçalho:", e.message);
}

    // título do relatório
    doc.font("Helvetica-Bold")
      .fontSize(16)
      .text("Relatório de Análise de Acidente de Trabalho", { align: "center" });
    doc.moveDown(1);

    // =================== DADOS PESSOAIS ===================
    tituloComLinhaSimples(doc, "Dados Pessoais");

    doc.font("Helvetica-Bold").text("Relatório: ", { continued: true });
    doc.font("Helvetica").text(dados.relatorio || "Não informado", { continued: true, width: 200 });
    doc.font("Helvetica-Bold").text("Matrícula: ", 83, doc.y, { continued: true });
    doc.font("Helvetica").text(dados.matricula || "Não informado", { width: 150 });
    doc.moveDown(0.5);

    doc.font("Helvetica-Bold").text("Nome: ", { continued: true });
    doc.font("Helvetica").text(dados.nome || "Não informado");
    doc.moveDown(0.5);

    doc.font("Helvetica-Bold").text("Nascimento: ", { continued: true });
    doc.font("Helvetica").text(formatDate(dados.nascimento), { continued: true, width: 140 });
    doc.font("Helvetica-Bold").text("   Telefone: ", { continued: true });
    doc.font("Helvetica").text(dados.telefone || "Não informado", { continued: true, width: 150 });
    doc.font("Helvetica-Bold").text("   Sexo: ", { continued: true });
    doc.font("Helvetica").text(dados.sexo || "Não informado");
    doc.moveDown(0.5);

    doc.font("Helvetica-Bold").text("Setor: ", { continued: true });
    doc.font("Helvetica").text(dados.setor || "Não informado", { continued: true, width: 180 });
    doc.font("Helvetica-Bold").text("Função: ", 101, doc.y, { continued: true });
    doc.font("Helvetica").text(dados.funcao || "Não informado", { width: 150 });
    doc.moveDown(1);

    // =================== DADOS DA EMPRESA ===================
    tituloComLinhaSimples(doc, "Dados da Empresa");
    doc.font("Helvetica-Bold").text("CNPJ: ", { continued: true });
    doc.font("Helvetica").text(dados.cnpj || "Não informado", { continued: true, width: 200 });
    doc.font("Helvetica-Bold").text("Empresa: ", 83, doc.y, { continued: true });
    doc.font("Helvetica").text(dados.empresa || "Não informado", { width: 150 });
    doc.moveDown(0.5);

    doc.font("Helvetica-Bold").text("Telefone: ", { continued: true });
    doc.font("Helvetica").text(dados.tel_empresa || "Não informado", { continued: true, width: 180 });
    doc.font("Helvetica-Bold").text("Endereço: ", 92, doc.y, { continued: true });
    doc.font("Helvetica").text(dados.endereco || "Não informado", { width: 150 });
    doc.moveDown(0.5);

    doc.font("Helvetica-Bold").text("CEP: ", { continued: true });
    doc.font("Helvetica").text(dados.cep || "Não informado");
    doc.moveDown(0.5);

    // =================== CAT ===================
    tituloComLinhaSimples(doc, "Comunicação de Acidente do Trabalho");

    doc.font("Helvetica-Bold").text("Tipo CAT: ", { continued: true });
    doc.font("Helvetica").text(dados.tipo_cat || "Não informado", { continued: true, width: 140 });
    doc.font("Helvetica-Bold").text("   Último dia trabalhado: ", { continued: true });
    doc.font("Helvetica").text(formatDate(dados.ult_dia), { continued: true, width: 150 });
    doc.font("Helvetica-Bold").text("   Comunicação à Polícia: ", { continued: true });
    doc.font("Helvetica").text(dados.comun_policia || "Não informado");
    doc.moveDown(0.5);

    doc.font("Helvetica-Bold").text("Houve Óbito: ", { continued: true });
    doc.font("Helvetica").text(dados.houve_obito || "Não informado", { continued: true, width: 140 });
    doc.font("Helvetica-Bold").text("   Data do Óbito: ", { continued: true });
    doc.font("Helvetica").text(formatDate(dados.data_obito), { continued: true, width: 150 });
    doc.font("Helvetica-Bold").text("   Emitente CAT: ", { continued: true });
    doc.font("Helvetica").text(dados.emitente_cat || "Não informado");
    doc.moveDown(0.5);

    // =================== DADOS DO ACIDENTE ===================
    tituloComLinhaSimples(doc, "Dados do Acidente");

    doc.font("Helvetica-Bold").text("Iniciativa da CAT: ", { continued: true });
    doc.font("Helvetica").text(dados.inicia_cat || "Não informado", { continued: true, width: 140 });
    doc.font("Helvetica-Bold").text("   Tipo Acidente: ", { continued: true });
    doc.font("Helvetica").text(dados.tipo_acidente || "Não informado");
    doc.moveDown(0.5);

    doc.font("Helvetica-Bold").text("Data do Acidente: ", { continued: true });
    doc.font("Helvetica").text(formatDate(dados.data_acidente), { continued: true, width: 140 });
    doc.font("Helvetica-Bold").text("   Hora do Acidente: ", { continued: true });
    doc.font("Helvetica").text(dados.hora_acidente || "Não informado", { continued: true, width: 150 });
    doc.font("Helvetica-Bold").text("   Horas Trabalhadas: ", { continued: true });
    doc.font("Helvetica").text(dados.horas_trab || "Não informado");
    doc.moveDown(0.5);

   // 3ª linha - Agente causador
   doc.font("Helvetica-Bold").text("Código Agente: ", { continued: true });
   doc.font("Helvetica").text(dados.cod_agente || "Não informado");
   doc.moveDown(0.5);

   // 4ª linha - Agente Causador do Acidente
   doc.font("Helvetica-Bold").text("Agente Causador do Acidente: ", { continued: true });
   doc.font("Helvetica").text(dados.agente || "Não informado");
   doc.moveDown(0.5);

   // 5ª linha - Código Acidente
   doc.font("Helvetica-Bold").text("Código Acidente: ", { continued: true });
   doc.font("Helvetica").text(dados.cod_acidente || "Não informado");
   doc.moveDown(0.5);

   // 6ª linha - Situação Acidente
   doc.font("Helvetica-Bold").text("Situação Geradora do Acidente: ", { continued: true });
   doc.font("Helvetica").text(dados.situacao_acidente || "Não informado");
   doc.moveDown(0.5);

   // 7ª linha - Código Parte Corpo
   doc.font("Helvetica-Bold").text("Código Parte Corpo: ", { continued: true });
   doc.font("Helvetica").text(dados.cod_parte_corpo || "Não informado");
   doc.moveDown(0.5);

   // 8ª linha - Parte do Corpo
   doc.font("Helvetica-Bold").text("Parte do Corpo: ", { continued: true });
   doc.font("Helvetica").text(dados.parte_corpo || "Não informado");
   doc.moveDown(0.5);

   // 9ª linha - Código Doença
   doc.font("Helvetica-Bold").text("Código Doença: ", { continued: true });
   doc.font("Helvetica").text(dados.cod_doenca || "Não informado");
   doc.moveDown(0.5);

   // 10ª linha - Situação Geradora da Doença
   doc.font("Helvetica-Bold").text("Situação Geradora da Doença: ", { continued: true });
   doc.font("Helvetica").text(dados.situacao_doenca || "Não informado");
   doc.moveDown(0.5);

    //11ª linha - Local do Acidente + Lateralidade
    doc.font("Helvetica-Bold").text("Local do Acidente: ", { continued: true });
    doc.font("Helvetica").text(dados.local_acidente || "Não informado", { continued: true, width: 140 });
    doc.font("Helvetica-Bold").text("   Lateralidade: ", { continued: true });
    doc.font("Helvetica").text(dados.lateralidade || "Não informado");
    doc.moveDown(0.5);

   // 12ª linha - Testemunha + Já Sofreu Acidente? + Usava EPI
   doc.font("Helvetica-Bold").text("Testemunha: ", { continued: true });
   doc.font("Helvetica").text(dados.testemunha  || "Não informado", { continued: true, width: 140 });
   doc.font("Helvetica-Bold").text("   Já Sofreu Acidente? ", { continued: true });
   doc.font("Helvetica").text(dados.sofreu_acidente || "Não informado", { continued: true, width: 150 });
   doc.font("Helvetica-Bold").text("   Usava EPI? ", { continued: true });
   doc.font("Helvetica").text(dados.epi || "Não informado");
   doc.moveDown(1);

// =================== DESCRIÇÃO ===================
tituloComLinhaSimples(doc, "Descrição do Acidente");

doc.text(dados.descricao_acidente || "Não informado.", {
  width: 500,
  align: "justify"
});
doc.moveDown(1.5);

// =================== PROVIDÊNCIAS ===================
tituloComLinhaSimples(doc, "Providências após o Acidente");

doc.text(dados.prov_acidente || "Não informado.", {
  width: 500,
  align: "justify"
});
doc.moveDown(2);



    // =================== ASSINATURAS ===================
    doc.moveDown(3);
    const pageWidth = doc.page.width;
    const margin = doc.page.margins.left;
    const usableWidth = pageWidth - margin * 2;
    const colWidth = usableWidth / 2;
    const y = doc.y;

    // Linha 1 - SESMT
    doc.moveTo(margin, y).lineTo(margin + colWidth - 20, y).stroke();
    doc.text("Assinatura e carimbo do SESMT", margin, y + 5, {
      width: colWidth - 20,
      align: "center"
    });

    // Linha 2 - Funcionário
    doc.moveTo(margin + colWidth + 20, y).lineTo(margin + usableWidth, y).stroke();
    doc.text("Assinatura do Funcionário", margin + colWidth + 20, y + 5, {
      width: colWidth - 20,
      align: "center"
    });

  doc.end();
  } catch (err) {
    console.error("❌ Erro ao gerar relatório:", err);
    res.status(500).json({ message: "Erro ao gerar relatório." });
  }
};
