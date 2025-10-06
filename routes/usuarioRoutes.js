const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");
const protegerRotas = require("../middlewares/authMiddleware");

// 🔹 Rotas protegidas de usuário
router.get("/usuario", protegerRotas, usuarioController.listarUsuarios);
router.post("/usuario", protegerRotas, usuarioController.cadastrarUsuario);
router.delete("/usuario/:id", protegerRotas, usuarioController.excluirUsuario);

module.exports = router;
