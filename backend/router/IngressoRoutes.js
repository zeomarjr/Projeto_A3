import express from "express";
import { CriarIngresso, ListarIngressosDoUsuario, CancelarIngresso } from "../controller/Ingressos.js";

const router = express.Router();

router.post("/comprar",  CriarIngresso);
router.get("/meus",  ListarIngressosDoUsuario);
router.patch("/cancelar/:id",  CancelarIngresso);
export default router;
