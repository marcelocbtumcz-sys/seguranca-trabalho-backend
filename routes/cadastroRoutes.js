const express = require("express");
const router = express.Router();
const cadastroController = require("../controllers/cadastroController");
const protegerRotas = require("../middlewares/authMiddleware");


// 🔹 Salvar cadastro
router.post("/", protegerRotas, cadastroController.salvarCadastro);

// 🔹 Gerar próximo número de relatório
router.get("/gerar-relatorio", protegerRotas, cadastroController.gerarProximoRelatorio);

module.exports = router;

