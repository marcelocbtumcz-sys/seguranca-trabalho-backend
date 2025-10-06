const express = require("express");
const router = express.Router();
const relatorioEpiController = require("../controllers/relatorioEpiController");

// Rota para relatório geral de EPIs
router.get("/relatorios-epi-geral", relatorioEpiController.relatorioEpiGeral);

module.exports = router;
