const express = require("express");
const router = express.Router();
const epiController = require("../controllers/epiController");
const protegerRotas = require("../middlewares/authMiddleware");

// 🔹 Rotas de EPI (todas protegidas)
router.post("/epi", protegerRotas, epiController.cadastrarEpi);
router.get("/epi", protegerRotas, epiController.listarEpis);
router.put("/epi/:idepi", protegerRotas, epiController.editarEpi);
router.delete("/epi/:idepi", protegerRotas, epiController.excluirEpi);

module.exports = router;
