import express from "express";
import {
  CreateEvento,
  BuscarAll,
  EventosUset,
  EventosId,
  getEventos,
  EditarEvento,
  DeletarEvento,
} from "../controller/Eventos.js";
import checkToken from "../util/verificar.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/createEvento", checkToken, upload.single("imagem"), CreateEvento);

router.get("/allEventos", BuscarAll);
router.get("/EventosUset", checkToken, EventosUset);
router.get("/EventosId/:id", EventosId);
router.get("/getEventos/:id", getEventos);
router.put("/editEvento/:id",  upload.single("imagem"), EditarEvento);
router.delete("/DeletarEvento/:id", DeletarEvento);

export default router;
