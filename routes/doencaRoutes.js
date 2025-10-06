const express = require("express");
const router = express.Router();
const corpoController = require("../controllers/corpoController");
const protegerRotas = require("../middlewares/authMiddleware");


// Listar doenca
router.get("/", protegerRotas, corpoController.listarCorpo);


module.exports = router;
