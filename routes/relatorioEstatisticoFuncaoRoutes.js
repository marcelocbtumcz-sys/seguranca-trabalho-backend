const express = require("express");
const router = express.Router();
const relatorioEstatisticoFuncaoController = require("../controllers/relatorioEstatisticoFuncaoController");
const protegerRotas = require("../middlewares/authMiddleware");

// Rota para relatório estatístico por função
router.get("/funcao", relatorioEstatisticoFuncaoController.getRelatorioEstatisticoFuncao);

module.exports = router;
