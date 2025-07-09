import { Router } from "express";
import { getComunasController } from "../controllers/comuna.controller.js";

const router = Router();

router.get("/", getComunasController);

export default router;
