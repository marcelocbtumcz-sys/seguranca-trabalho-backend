const express = require("express");
const router = express.Router();
const controller = require("../controllers/epiFuncionarioController");

// Rotas
router.get("/", controller.listar);
router.get("/:id", controller.buscarPorId);
router.post("/", controller.cadastrar);
router.put("/:id", controller.atualizar);
router.delete("/:id", controller.deletar);
router.put("/:id/devolucao", controller.marcarDevolucao);

module.exports = router;
