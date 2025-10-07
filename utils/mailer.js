require("dotenv").config();
const nodemailer = require("nodemailer");

async function enviarEmail({ to, subject, html }) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Suporte SESMT" <${process.env.MAIL_USER}>`,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ E-mail enviado com sucesso:", info.response);
  } catch (err) {
    console.error("❌ Erro ao enviar e-mail:", err);
  }
}

module.exports = enviarEmail;
