require("dotenv").config();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const {
  GMAIL_USER,
  GMAIL_CLIENT_ID,
  GMAIL_CLIENT_SECRET,
  GMAIL_REFRESH_TOKEN,
  GMAIL_REDIRECT_URI
} = process.env;

const oAuth2Client = new google.auth.OAuth2(
  GMAIL_CLIENT_ID,
  GMAIL_CLIENT_SECRET,
  GMAIL_REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: GMAIL_REFRESH_TOKEN });

async function enviarEmail({ to, subject, html }) {
  try {
    console.log("🔹 Iniciando envio de e-mail...");
    console.log("GMAIL_USER:", GMAIL_USER);
    console.log("Destinatário:", to);

    const accessToken = await oAuth2Client.getAccessToken();
    console.log("🔹 Access Token obtido com sucesso");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: GMAIL_USER,
        clientId: GMAIL_CLIENT_ID,
        clientSecret: GMAIL_CLIENT_SECRET,
        refreshToken: GMAIL_REFRESH_TOKEN,
        accessToken: accessToken.token
      }
    });

    const mailOptions = {
      from: `"Suporte SESMT" <${GMAIL_USER}>`,
      to,
      subject,
      html
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ E-mail enviado com sucesso:", info);
  } catch (err) {
    console.error("❌ Erro ao enviar e-mail:", err);
  }
}

module.exports = enviarEmail;
