const express = require("express");
const router = express.Router();
const relatorioEstatisticoSetorController = require("../controllers/relatorioEstatisticoSetorController");
const protegerRotas = require("../middlewares/authMiddleware");

// Rota para relatório estatístico por setor
router.get("/setor", relatorioEstatisticoSetorController.getRelatorioEstatisticoSetor);

module.exports = router;
