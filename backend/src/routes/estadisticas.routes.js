import { Router } from "express";
import { registrarVisitaController } from "../controllers/estadisticas.controller.js";

const router = Router();

router.patch("/publicacion/:id/visita", registrarVisitaController);

export default router;
