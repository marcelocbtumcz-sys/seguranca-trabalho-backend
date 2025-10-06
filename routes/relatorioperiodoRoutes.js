const express = require("express");
const router = express.Router();
const relatorioperiodoController = require("../controllers/relatorioperiodoController");
const protegerRotas = require("../middlewares/authMiddleware");

// Rota protegida para gerar relatório por período
router.get("/", protegerRotas, relatorioperiodoController.gerarRelatorioPeriodo);

module.exports = router;
