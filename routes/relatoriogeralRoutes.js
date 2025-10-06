const express = require("express");
const router = express.Router();
const relatoriogeralController = require("../controllers/relatoriogeralController");
const protegerRotas = require("../middlewares/authMiddleware");

// Rota protegida para gerar relatório geral
router.get("/", protegerRotas, relatoriogeralController.gerarRelatorioGeral);

module.exports = router;
