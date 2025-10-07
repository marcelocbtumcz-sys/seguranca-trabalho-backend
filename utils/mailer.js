// utils/mailer.js
const Mailjet = require('node-mailjet');

const mailjet = Mailjet.apiConnect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE
);

async function enviarEmail({ to, subject, html }) {
  try {
    const request = mailjet
      .post('send', { version: 'v3.1' })
      .request({
        Messages: [
          {
            From: {
              Email: "mantonio@cbtu.gov.br",
              Name: "Sistema SESMT",
            },
            To: [
              {
                Email: to,
              },
            ],
            Subject: subject,
            HTMLPart: html,
          },
        ],
      });

    const result = await request;
    console.log('✅ E-mail enviado:', result.body);
    return result.body;
  } catch (err) {
    console.error('❌ Erro ao enviar e-mail:', err.message);
    throw new Error(err.message);
  }
}

module.exports = enviarEmail;
