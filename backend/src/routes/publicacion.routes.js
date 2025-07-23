"use strict";
import { Router } from "express";
import {
  createPublicacion,
  deletePublicacion,
  getMisPublicaciones,
  getPublicacionById,
  getPublicaciones,
  getPublicacionesPublicas,
  updatePublicacion
} from "../controllers/publicacion.controller.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";

const router = Router();

router.post("/publicaciones", authenticateJwt, createPublicacion);
router.get("/publicaciones", getPublicaciones);
router.patch("/publicaciones/:id", authenticateJwt, updatePublicacion);
router.delete("/publicaciones/:id", authenticateJwt, deletePublicacion);
router.get("/public", getPublicacionesPublicas);
router.get("/public/:id", getPublicacionById);
router.get("/mias", authenticateJwt, getMisPublicaciones);
export default router;
