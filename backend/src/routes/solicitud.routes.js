"use strict";
import { Router } from "express";
import {
    aceptarSolicitud,
    createSolicitud,
    getSolicitudes,
    rechazarSolicitud,
} from "../controllers/solicitud.controller.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { isAdmin } from "../middlewares/authorization.middleware.js";

const router = Router();

router.post("/solicitudes", createSolicitud);
router.get("/solicitudes", authenticateJwt, isAdmin, getSolicitudes);
router.post("/solicitudes/:id/aceptar", authenticateJwt, isAdmin, aceptarSolicitud);
router.delete("/solicitudes/:id/rechazar", authenticateJwt, isAdmin, rechazarSolicitud);

export default router;