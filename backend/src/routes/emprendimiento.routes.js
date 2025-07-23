import { Router } from "express";
import { getMisEmprendimientos } from "../controllers/emprendimiento.controller.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";

const router = Router();

router.get("/mios", authenticateJwt, getMisEmprendimientos);

export default router;
