const express = require("express");
const router = express.Router();
const listarCadastroController = require("../controllers/listarCadastroController");
const protegerRotas = require("../middlewares/authMiddleware");

// Cadastro
router.get("/cadastro", protegerRotas, listarCadastroController.listarCadastros);
router.put("/cadastro/:id", protegerRotas, listarCadastroController.atualizarCadastro);
router.delete("/cadastro/:id", protegerRotas, listarCadastroController.excluirCadastro);

// Funcionários
router.get("/funcionarios", protegerRotas, listarCadastroController.listarFuncionarios);
router.get("/funcionarios/matricula/:matricula", protegerRotas, listarCadastroController.buscarFuncionarioMatricula);
router.get("/funcionarios/nome/:nome", protegerRotas, listarCadastroController.buscarFuncionarioNome);
router.get("/funcionarios/setor/:setor", protegerRotas, listarCadastroController.buscarFuncionarioSetor);
router.get("/funcionarios/funcao/:funcao", protegerRotas, listarCadastroController.buscarFuncionarioFuncao);

// Acidentes
router.put("/cadastro/:id/acidente", protegerRotas, listarCadastroController.atualizarAcidente);

module.exports = router;
