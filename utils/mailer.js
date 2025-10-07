// utils/mailer.js
const nodemailer = require("nodemailer");

// Transporter configurado (Gmail, Outlook, etc.)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "marcelo.cbtu.mcz@gmail.com", // seu e-mail
    pass: "jrqz qolz hdwp ynaj"         // senha de app do Gmail
  }
});

// Função genérica para enviar e-mails
async function enviarEmail({ to, subject, html }) {
  return transporter.sendMail({
    from: '"Suporte - Sistema de Controle SESMT" <marcelo.cbtu.mcz@gmail.com>',
    to,
    subject,
    html
  });
}

module.exports = enviarEmail;
