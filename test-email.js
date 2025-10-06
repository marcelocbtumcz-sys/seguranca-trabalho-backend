const enviarEmail = require("./utils/mailer");

enviarEmail({
  to: "seuemaildeteste@gmail.com",
  subject: "Teste de envio - Sistema SESMT",
  html: "<h2>Funcionou!</h2><p>Envio de e-mail com OAuth2 ativo.</p>"
});
