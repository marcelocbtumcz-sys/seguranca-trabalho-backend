const express = require("express");
const router = express.Router();
const relatorioEpiFuncionarioController = require("../controllers/relatorioEpiFuncionarioController");

// Relatório de EPIs por funcionário
router.get("/relatorios-epi-funcionario", relatorioEpiFuncionarioController.relatorioEpiFuncionario);

// Listar nomes de funcionários
router.get("/funcionarios-nomes", relatorioEpiFuncionarioController.getFuncionariosNomes);

module.exports = router;
