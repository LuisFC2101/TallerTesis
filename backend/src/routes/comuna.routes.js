import { Router } from "express";
import { getComunasController } from "../controllers/comuna.controller.js";

const router = Router();

router.get("/comunas", getComunasController);

export default router;
