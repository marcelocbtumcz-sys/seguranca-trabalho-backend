const express = require("express");
const router = express.Router();
const relatorioEstatisticoController = require("../controllers/relatorioEstatisticoController");
const protegerRotas = require("../middlewares/authMiddleware");

// Rota para relatório estatístico geral
router.get("/geral", relatorioEstatisticoController.getRelatorioEstatisticoGeral);

module.exports = router;
