const express = require("express");
const router = express.Router();
const funcionarioController = require("../controllers/funcionarioController");
const protegerRotas = require("../middlewares/authMiddleware");

// Listar funcionários
router.get("/", protegerRotas, funcionarioController.listarFuncionarios);

// (futuramente você pode adicionar outras rotas aqui: criar, editar, excluir)

module.exports = router;

