const path = require("path");

function protegerHtml(req, res, next) {
  const publicPages = [
    "/",
    "/login.html",
    "/recuperar.html",
    "/nova-senha.html"
  ];

  const extensoesLivres = [".css", ".js", ".png", ".jpg", ".ico"];

  const ext = path.extname(req.path);

  if (publicPages.includes(req.path) || extensoesLivres.includes(ext)) {
    return next();
  }

  // Bloquear HTML sem sessão
  if (req.path.endsWith(".html")) {
    if (!req.session || !req.session.usuario) {
      return res.status(403).send(`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Acesso Negado</title>
          <style>
            body {
              background-color: #f0f4f8;
              font-family: "Segoe UI", Arial, sans-serif;
              display: flex;
              align-items: center;
              justify-content: center;
              height: 100vh;
              margin: 0;
            }
            .card {
              background: #fff;
              border-radius: 16px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.1);
              text-align: center;
              padding: 40px 60px;
              max-width: 420px;
              color: #1b3a57;
            }
            .icon {
              font-size: 60px;
              color: #1b3a57;
              margin-bottom: 15px;
            }
            h1 {
              margin: 0 0 10px;
              font-size: 26px;
              color: #1b3a57;
            }
            p {
              font-size: 16px;
              color: #555;
              margin-bottom: 30px;
            }
            a.button {
              background: #1b3a57;
              color: #fff;
              text-decoration: none;
              padding: 10px 20px;
              border-radius: 8px;
              font-weight: bold;
              transition: 0.2s;
            }
            a.button:hover {
              background: #244d74;
            }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="icon">🚫</div>
            <h1>Acesso Negado</h1>
            <p>Sua sessão expirou ou você não está autenticado.<br>Faça login novamente para continuar.</p>
            <a class="button" href="/login.html">🔑 Voltar ao Login</a>
          </div>
        </body>
        </html>
      `);
    }
  }

  next();
}

module.exports = protegerHtml;
