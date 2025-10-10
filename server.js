// ============================
// 🔹 Importações principais
// ============================
const express = require("express");
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const axios = require("axios");
const { dispararEmailsEpiVencido } = require("./cron/verificarEpiVencido");

// 🔹 Importações de rotas e middlewares
const protegerRotas = require("./middlewares/authMiddleware");
const authRoutes = require("./routes/authRoutes");
const funcionarioRoutes = require("./routes/funcionarioRoutes");
const acidentesRoutes = require("./routes/acidentesRoutes");
const doencaRoutes = require("./routes/doencaRoutes");
const corpoRoutes = require("./routes/corpoRoutes");
const agenteRoutes = require("./routes/agenteRoutes");
const empresasRoutes = require("./routes/empresasRoutes");
const cadastroRoutes = require("./routes/cadastroRoutes");
const relatorioAcidenteRoutes = require("./routes/relatorioAcidenteRoutes");
const relatoriogeralRoutes = require("./routes/relatoriogeralRoutes");
const relatorioperiodoRoutes = require("./routes/relatorioperiodoRoutes");
const relatorioEstatisticoRoutes = require("./routes/relatorioEstatisticoRoutes");
const relatorioEstatisticoFuncaoRoutes = require("./routes/relatorioEstatisticoFuncaoRoutes");
const relatorioEstatisticoSetorRoutes = require("./routes/relatorioEstatisticoSetorRoutes");
const listarCadastroRoutes = require("./routes/listarCadastroRoutes");
const recuperarSenhaRoutes = require("./routes/recuperarSenhaRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");
const epiRoutes = require("./routes/epiRoutes");
const epiFuncionarioRoutes = require("./routes/epiFuncionarioRoutes");
const relatorioEpiRoutes = require("./routes/relatorioEpiRoutes");
const relatorioEpiFuncionarioRoutes = require("./routes/relatorioEpiFuncionarioRoutes");

const app = express();
const isProduction = process.env.NODE_ENV === "production";

// ============================
// 🔹 Configuração de CORS segura
// ============================
const allowedOrigins = [
  "http://localhost:5500",
  "https://sistema-sesmt.onrender.com"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Origem não permitida pelo CORS"));
    }
  },
  credentials: true
}));

app.use(express.json());

// ============================
// 🔹 Configuração de Sessão
// ============================
app.set("trust proxy", isProduction ? 1 : 0);

app.use(session({
  secret: "chave_super_secreta",
  resave: false,
  saveUninitialized: false,
  proxy: true,
  cookie: {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 1000 * 60 * 60 * 2
  }
}));

// ============================
// 🔹 Rotas públicas
// ============================
app.get("/status", (req, res) => {
  res.send("✅ Servidor rodando e acessível!");
});

app.use("/", recuperarSenhaRoutes);
app.use("/", authRoutes);

// ============================
// 🔹 Middleware para proteger páginas HTML (antes do static!)
// ============================
app.use((req, res, next) => {
  if (req.path.endsWith(".html") && !["/login.html", "/recuperar.html"].includes(req.path)) {
    if (!req.session || !req.session.usuario) {
      return res.status(403).send(`
        <html>
          <body style="font-family: Arial; text-align: center; margin-top: 100px;">
            <h2>🚫 Acesso Negado</h2>
            <p>Faça login para acessar esta página.</p>
            <a href="/login.html">Ir para o Login</a>
          </body>
        </html>
      `);
    }
  }
  next();
});

// ============================
// 🔹 Servir frontend (Render ou local)
// ============================
const frontendPath = path.join(__dirname, "frontend");
app.use(express.static(frontendPath));

// Página inicial (login)
app.get("/", (req, res) => {
  res.sendFile(path.join(frontendPath, "login.html"));
});

// ============================
// 🔹 Middleware de proteção global da API
// ============================
app.use(protegerRotas);

// ============================
// 🔹 Rotas privadas
// ============================
app.use("/funcionarios", funcionarioRoutes);
app.use("/acidentes", acidentesRoutes);
app.use("/doenca", doencaRoutes);
app.use("/corpo", corpoRoutes);
app.use("/agente", agenteRoutes);
app.use("/empresa", empresasRoutes);
app.use("/cadastro", cadastroRoutes);
app.use("/", relatorioAcidenteRoutes);
app.use("/relatorios-geral", relatoriogeralRoutes);
app.use("/relatorios-periodo", relatorioperiodoRoutes);
app.use("/relatorios-estatistico", relatorioEstatisticoRoutes);
app.use("/relatorios-estatistico", relatorioEstatisticoFuncaoRoutes);
app.use("/relatorios-estatistico", relatorioEstatisticoSetorRoutes);
app.use("/", listarCadastroRoutes);
app.use(usuarioRoutes);
app.use(epiRoutes);
app.use("/epi_funcionario", epiFuncionarioRoutes);
app.use("/", relatorioEpiRoutes);
app.use("/", relatorioEpiFuncionarioRoutes);

// ============================
// 🔹 Teste manual de e-mails de EPIs vencidos
// ============================
app.get("/verificar-epis-vencidos", async (req, res) => {
  try {
    await dispararEmailsEpiVencido();
    res.send("✅ Verificação manual de EPIs vencidos concluída.");
  } catch (err) {
    console.error("Erro ao executar verificação manual:", err);
    res.status(500).send("Erro ao executar verificação manual de EPIs vencidos.");
  }
});

// ============================
// 🔹 Mantém o Render acordado
// ============================
if (process.env.RENDER_EXTERNAL_URL) {
  const wakeUpURL = process.env.RENDER_EXTERNAL_URL + "/status";
  console.log(`⏰ Ativando self-ping para: ${wakeUpURL}`);

  setInterval(async () => {
    try {
      await axios.get(wakeUpURL);
      console.log("💤 Ping enviado para manter ativo");
    } catch (err) {
      console.log("⚠️ Falha no ping:", err.message);
    }
  }, 5 * 60 * 1000);
}

// ============================
// 🔹 Inicialização
// ============================
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});

// ============================
// 🔹 Cron
// ============================
require("./cron/verificarEpiVencido");
require("./cron/verificarEpiVidaUtil");



