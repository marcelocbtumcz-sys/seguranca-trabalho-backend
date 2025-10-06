const express = require("express");
const router = express.Router();
const acidentesController = require("../controllers/acidentesController");
const protegerRotas = require("../middlewares/authMiddleware");


// Listar acidentes
router.get("/", protegerRotas, acidentesController.listarAcidentes);


module.exports = router;
