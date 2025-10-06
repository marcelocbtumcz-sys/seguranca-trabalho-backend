const nodemailer = require("nodemailer");
const { google } = require("googleapis");

// 🔹 Lendo as variáveis de ambiente
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;
const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;
const USER_EMAIL = process.env.GOOGLE_USER_EMAIL;

// 🔹 Configuração do OAuth2
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// 🔹 Função genérica para enviar e-mails
async function enviarEmail({ to, subject, html }) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: USER_EMAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken.token
      }
    });

    const info = await transporter.sendMail({
      from: `"Suporte - Sistema SESMT" <${USER_EMAIL}>`,
      to,
      subject,
      html
    });

    console.log("✅ E-mail enviado com sucesso:", info.messageId);
    return info;
  } catch (err) {
    console.error("❌ Erro ao enviar e-mail:", err);
    throw err;
  }
}

module.exports = enviarEmail;
