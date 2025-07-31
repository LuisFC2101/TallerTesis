import { Router } from "express";
import { getUsuariosMasActivosController } from "../controllers/estadisticas.controller.js";
import { isAdmin, } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";

const router = Router();

router.get("/usuarios-mas-activos", authenticateJwt, isAdmin, getUsuariosMasActivosController);

export default router;
