// 📁 cron/verificarEpiVidaUtil.js
require("dotenv").config();
const db = require("../db");
const enviarEmail = require("../utils/mailer");
const cron = require("node-cron");

// 🔹 Busca EPIs com vida útil vencida ou que vence no mês atual
async function buscarEpiVidaUtilVencidaOuProxima() {
  const hoje = new Date();
  const primeiroDia = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
  const ultimoDia = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);

  const inicio = primeiroDia.toISOString().split("T")[0];
  const fim = ultimoDia.toISOString().split("T")[0];

  const [rows] = await db.query(
    `
    SELECT nome, matricula, epi, ca, vida
    FROM epi_funcionario
    WHERE DATE(vida) BETWEEN ? AND ?
      AND (devolucao IS NULL OR devolucao = 0)
    ORDER BY vida ASC
    `,
    [inicio, fim]
  );

  return rows;
}

// 🔹 Converte data (YYYY-MM-DD → DD/MM/YYYY)
function formatarDataLocal(dataISO) {
  const [ano, mes, dia] = dataISO.split("-");
  return `${dia}/${mes}/${ano}`;
}

// 🔹 Dispara e-mails com lista de EPIs com vida útil vencida
async function dispararEmailsEpiVidaUtil() {
  try {
    const hoje = new Date();
    const epis = await buscarEpiVidaUtilVencidaOuProxima();

    if (epis.length === 0) {
      console.log("✅ Nenhum EPI com vida útil vencida ou a vencer neste mês.");
      return;
    }

    const [usuarios] = await db.query(`
      SELECT nome, email 
      FROM usuario 
      WHERE email IS NOT NULL AND email != ''
    `);

    if (!usuarios.length) {
      console.log("⚠️ Nenhum usuário com e-mail cadastrado para notificação.");
      return;
    }

    // Montagem da tabela HTML
    const linhas = epis.map(e => {
      const dataVida = e.vida.split("T")[0];
      const vidaLocal = formatarDataLocal(dataVida);

      const [ano, mes, dia] = dataVida.split("-");
      const vida = new Date(ano, mes - 1, dia);
      const hojeLimpo = new Date();
      vida.setHours(0, 0, 0, 0);
      hojeLimpo.setHours(0, 0, 0, 0);

      const diasRestantes = Math.floor((vida - hojeLimpo) / (1000 * 60 * 60 * 24));
      const status =
        diasRestantes < 0
          ? "🔴 VIDA ÚTIL VENCIDA"
          : `🟠 Faltam ${diasRestantes} dia${diasRestantes !== 1 ? "s" : ""}`;

      return `
        <tr>
          <td>${e.nome}</td>
          <td>${e.matricula}</td>
          <td>${e.epi}</td>
          <td>${e.ca}</td>
          <td>${vidaLocal}</td>
          <td>${status}</td>
        </tr>
      `;
    }).join("");

    const mesAno = hoje.toLocaleString("pt-BR", { month: "long", year: "numeric" });

    const html = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #1565c0; text-align: center;">
          🧾 Relatório Mensal de EPIs com Vida Útil Vencida ou Próxima do Vencimento (${mesAno})
        </h2>
        <p>Segue a lista dos EPIs cuja <b>vida útil</b> está <b>vencida</b> ou vencerá durante o mês de <b>${mesAno}</b>:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
          <thead style="background-color: #1976d2; color: white;">
            <tr>
              <th style="padding: 8px; border: 1px solid #ccc;">Funcionário</th>
              <th style="padding: 8px; border: 1px solid #ccc;">Matrícula</th>
              <th style="padding: 8px; border: 1px solid #ccc;">EPI</th>
              <th style="padding: 8px; border: 1px solid #ccc;">CA</th>
              <th style="padding: 8px; border: 1px solid #ccc;">Vida Útil</th>
              <th style="padding: 8px; border: 1px solid #ccc;">Status</th>
            </tr>
          </thead>
          <tbody>${linhas}</tbody>
        </table>

        <p style="margin-top:20px;">Favor verificar e providenciar a substituição quando necessário.</p>
        <p style="color:#555;">Atenciosamente,<br><strong>Equipe de Segurança do Trabalho</strong></p>
      </div>
    `;

    // 🔹 Envio com intervalo de 5 segundos entre cada e-mail
    for (const [index, u] of usuarios.entries()) {
      if (index > 0) {
        await new Promise(resolve => setTimeout(resolve, 5000)); // 5 segundos de pausa
      }

      try {
        const resposta = await enviarEmail({
          to: u.email,
          subject: `🧾 Relatório Mensal - EPIs com vida útil vencida ou próxima do vencimento (${mesAno})`,
          html
        });

        console.log(`📧 E-mail enviado para: ${u.nome} (${u.email}) →`, resposta.Messages?.[0]?.Status || "OK");
      } catch (err) {
        console.error(`❌ Erro ao enviar e-mail para ${u.email}:`, err.message);
      }
    }

    console.log("✅ Envio de relatórios concluído com sucesso!");

  } catch (err) {
    console.error("❌ Erro ao verificar/disparar e-mails de EPIs com vida útil vencida:", err);
  }
}

// 🔹 Agenda: todo dia 1º às 08:00
cron.schedule("0 8 1 * *", async () => {
  console.log("⏰ Executando rotina mensal de EPIs com vida útil vencida...");
  await dispararEmailsEpiVidaUtil();
});

module.exports = { dispararEmailsEpiVidaUtil };
