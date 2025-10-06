// routes/relatorioAcidenteRoutes.js
const express = require("express");
const router = express.Router();
const relatorioAcidenteController = require("../controllers/relatorioAcidenteController");
const protegerRotas = require("../middlewares/authMiddleware");

// 🔹 Gerar PDF do relatório de acidente
router.post("/relatorio/acidente/:relatorio", protegerRotas, relatorioAcidenteController.gerarRelatorio);

module.exports = router;
