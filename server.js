// ============================
// 🔹 Importações principais
// ============================
const express = require("express");
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const { dispararEmailsEpiVencido } = require("./cron/verificarEpiVencido");

// 🔹 Importações de rotas e middlewares
const protegerHtml = require("./middlewares/protegerHtml");
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
  "http://localhost:5500",              // VS Code Live Server
  "http://127.0.0.1:5500",              // outro possível endereço local
  "http://10.10.40.9:3000",           // se acessar via IP local na rede
  "https://sistema-sesmt.onrender.com"  // domínio do backend/front hospedado no Render
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
// 🔹 Configuração de Sessão (Render)

app.set("trust proxy", isProduction ? 1 : 0);
// ============================
app.set("trust proxy", 1);

app.use(session({
  secret: "chave_super_secreta",
  resave: false,
  saveUninitialized: false,
  proxy: true,

  cookie: {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // só exige HTTPS no Render
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 1000 * 60 * 60 * 2 // 2 horas
}

}));

// ============================
// 🔹 Rota de teste de sessão/cookie
// ============================
app.get("/test-cookie", (req, res) => {
  if (!req.session.visitas) {
    req.session.visitas = 1;
  } else {
    req.session.visitas++;
  }
  res.json({ visitas: req.session.visitas });
});

// ============================
// 🔹 Rotas públicas
// ============================
app.get("/status", (req, res) => {
  res.send("✅ Servidor rodando e acessível!");
});

app.use("/", recuperarSenhaRoutes);
app.use("/", authRoutes);

// ============================
// 🔹 Servir frontend (Render)
// ============================

// Caminho correto do frontend dentro do backend
const frontendPath = path.join(__dirname, "frontend");

// Servir arquivos estáticos protegendo HTMLs

// 1️⃣ Servir arquivos estáticos (imagens, css, js, etc.)
app.use(express.static(frontendPath));

// 2️⃣ Depois aplicar a proteção apenas para os HTMLs
app.use(protegerHtml);



// Página inicial (login)
app.get("/", (req, res) => {
  res.sendFile(path.join(frontendPath, "login.html"));
});

// ============================
// 🔹 Middleware de proteção global
// ============================
app.use(protegerRotas);

// ============================
// 🔹 Rotas privadas da API
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
    res.send("✅ Verificação manual de EPIs vencidos concluída (verifique o e-mail).");
  } catch (err) {
    console.error("Erro ao executar verificação manual:", err);
    res.status(500).send("Erro ao executar verificação manual de EPIs vencidos.");
  }
});

// ============================
// 🔹 Inicialização do servidor
// ============================
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});

// ============================
// 🔹 Cron automático
// ============================
require("./cron/verificarEpiVencido"); 
require("./cron/verificarEpiVidaUtil");

