const express = require("express");
const router = express.Router();
const corpoController = require("../controllers/corpoController");
const protegerRotas = require("../middlewares/authMiddleware");


// Listar corpo
router.get("/", protegerRotas, corpoController.listarCorpo);


module.exports = router;