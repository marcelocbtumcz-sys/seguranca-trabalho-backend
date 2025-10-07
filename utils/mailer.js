require("dotenv").config();
const { Resend } = require("resend");

// Inicializa o cliente Resend
const resend = new Resend(process.env.RESEND_API_KEY);

async function enviarEmail({ to, subject, html }) {
  try {
    console.log("📨 Enviando e-mail via Resend...");
    console.log("Destinatário:", to);

    const { data, error } = await resend.emails.send({
      from: "Sistema SESMT <onboarding@resend.dev>", // pode mudar depois
      to,
      subject,
      html,
    });

    if (error) {
      console.error("❌ Erro ao enviar e-mail:", error);
      return { success: false, error };
    }

    console.log("✅ E-mail enviado com sucesso:", data);
    return { success: true, data };
  } catch (err) {
    console.error("❌ Erro inesperado:", err);
    return { success: false, error: err };
  }
}

module.exports = enviarEmail;

