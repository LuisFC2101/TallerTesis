"use strict";
import { Router } from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import solicitudRoutes from "./solicitud.routes.js";
import publicacionRoutes from "./publicacion.routes.js";
import comunaRoutes from "./comuna.routes.js"; 

const router = Router();


router.use("/auth", authRoutes)
router.use("/user", userRoutes)
router.use("/", solicitudRoutes)
router.use("/", publicacionRoutes)
router.use("/comunas", comunaRoutes)

export default router;