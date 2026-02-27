const express = require("express");

const router = express.Router();

const listaController = require("../controllers/lista.controller");

router.get("/lista", listaController.listadois);
router.post("/lista", listaController.cadastrarItem);
router.put("/item/:id", listaController.atualizarItem);
router.delete("/item/:id", listaController.apagarItem);

module.exports = router;