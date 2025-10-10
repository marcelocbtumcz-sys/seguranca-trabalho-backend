require("dotenv").config();
const db = require("../db");
const enviarEmail = require("../utils/mailer");
const cron = require("node-cron");

// 🔹 Busca EPIs vencidos ou que vencem no mês atual
async function buscarEpiVencidoOuProximo() {
  const hoje = new Date();
  const primeiroDia = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
  const ultimoDia = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);

  const inicio = primeiroDia.toISOString().split("T")[0];
  const fim = ultimoDia.toISOString().split("T")[0];

  const [rows] = await db.query(
    `
    SELECT nome, matricula, epi, ca, validade
    FROM epi_funcionario
    WHERE DATE(validade) BETWEEN ? AND ?
      AND (devolucao IS NULL OR devolucao = 0)
    ORDER BY validade ASC
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

// 🔹 Dispara e-mails com lista de EPIs vencidos
async function dispararEmailsEpiVencido() {
  try {
    const hoje = new Date();
    const epis = await buscarEpiVencidoOuProximo();

    if (epis.length === 0) {
      console.log("✅ Nenhum EPI vencido ou com validade neste mês.");
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

    // 🔹 Montagem da tabela HTML
    const linhas = epis.map(e => {
      const dataValidade = e.validade.split("T")[0];
      const validadeLocal = formatarDataLocal(dataValidade);

      const [ano, mes, dia] = dataValidade.split("-");
      const validade = new Date(ano, mes - 1, dia);
      const hojeLimpo = new Date();
      validade.setHours(0, 0, 0, 0);
      hojeLimpo.setHours(0, 0, 0, 0);

      const diasRestantes = Math.floor((validade - hojeLimpo) / (1000 * 60 * 60 * 24));
      const status =
        diasRestantes < 0
          ? "🔴 VENCIDO"
          : `🟠 Faltam ${diasRestantes} dia${diasRestantes !== 1 ? "s" : ""}`;

      return `
        <tr>
          <td>${e.nome}</td>
          <td>${e.matricula}</td>
          <td>${e.epi}</td>
          <td>${e.ca}</td>
          <td>${validadeLocal}</td>
          <td>${status}</td>
        </tr>
      `;
    }).join("");

    const mesAno = hoje.toLocaleString("pt-BR", { month: "long", year: "numeric" });

    const html = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #b71c1c; text-align: center;">
          📅 Relatório Mensal de EPIs Vencidos ou Próximos do Vencimento (${mesAno})
        </h2>
        <p>Segue a lista dos EPIs que estão <b>vencidos</b> ou que irão vencer durante o mês de <b>${mesAno}</b>:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
          <thead style="background-color: #d32f2f; color: white;">
            <tr>
              <th style="padding: 8px; border: 1px solid #ccc;">Funcionário</th>
              <th style="padding: 8px; border: 1px solid #ccc;">Matrícula</th>
              <th style="padding: 8px; border: 1px solid #ccc;">EPI</th>
              <th style="padding: 8px; border: 1px solid #ccc;">CA</th>
              <th style="padding: 8px; border: 1px solid #ccc;">Validade</th>
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
        await new Promise(resolve => setTimeout(resolve, 5000)); // pausa 5s entre e-mails
      }

      try {
        const resposta = await enviarEmail({
          to: u.email,
          subject: `📅 Relatório Mensal - EPIs vencidos ou próximos do vencimento (${mesAno})`,
          html
        });

        console.log(`📧 E-mail enviado para: ${u.nome} (${u.email}) →`, resposta.Messages?.[0]?.Status || "OK");
      } catch (err) {
        console.error(`❌ Erro ao enviar e-mail para ${u.email}:`, err.message);
      }
    }

    console.log("✅ Envio de relatórios concluído com sucesso!");

  } catch (err) {
    console.error("❌ Erro ao verificar/disparar e-mails de EPIs vencidos:", err);
  }
}

// 🔹 Agenda: todo dia 1º às 08:00
cron.schedule("0 8 1 * *", async () => {
  console.log("⏰ Executando rotina mensal de EPIs vencidos...");
  await dispararEmailsEpiVencido();
});

module.exports = { dispararEmailsEpiVencido };

