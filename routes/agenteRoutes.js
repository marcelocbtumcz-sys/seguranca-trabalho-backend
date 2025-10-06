const express = require("express");
const router = express.Router();
const agenteController = require("../controllers/agenteController");
const protegerRotas = require("../middlewares/authMiddleware");


// Listar agente
router.get("/", protegerRotas, agenteController.listarAgente);


module.exports = router;
