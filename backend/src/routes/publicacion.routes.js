"use strict";
import { Router } from "express";
import {
  createPublicacion,
  deletePublicacion,
  getPublicaciones,
  updatePublicacion
} from "../controllers/publicacion.controller.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";

const router = Router();

router.post("/publicaciones", authenticateJwt, createPublicacion);
router.get("/publicaciones", getPublicaciones);
router.patch("/publicaciones/:id", authenticateJwt, updatePublicacion);
router.delete("/publicaciones/:id", authenticateJwt, deletePublicacion)

export default router;
