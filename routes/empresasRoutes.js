const express = require("express");
const router = express.Router();
const empresasController = require("../controllers/empresasController");
const protegerRotas = require("../middlewares/authMiddleware");


// Listar empresas
router.get("/", protegerRotas, empresasController.listarEmpresas);


module.exports = router;




