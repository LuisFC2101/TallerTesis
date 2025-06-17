"use strict";
import {
  createPublicacionService,
  deletePublicacionService,
  getPublicacionesService,
  updatePublicacionService,
} from "../services/publicacion.service.js";
import {
  handleErrorClient,
  handleErrorServer,
  handleSuccess,
} from "../handlers/responseHandlers.js";
import { publicacionValidation } from "../validations/publicacion.validation.js";

export async function createPublicacion(req, res) {
  try {
    
    const { error } = publicacionValidation.validate(req.body);
    if (error)
      return handleErrorClient(res, 400, "Validación fallida", error.message);

    
    const datos = { ...req.body, usuarioId: req.user.id };

    const [publicacion, serviceError] = await createPublicacionService(datos);
    if (serviceError)
      return handleErrorClient(res, 400, "Error al crear publicación", serviceError);

    handleSuccess(res, 201, "Publicación creada exitosamente", publicacion);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function getPublicaciones(req, res) {
  try {
    const [publicaciones, error] = await getPublicacionesService();
    if (error)
      return handleErrorClient(res, 400, "Error al obtener publicaciones", error);

    handleSuccess(res, 200, "Publicaciones obtenidas correctamente", publicaciones);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function updatePublicacion(req, res) {
  try {
    const id = parseInt(req.params.id);
    const userId = req.user.id;
    const updateData = req.body;

    if (isNaN(id)) {
      return handleErrorClient(res, 400, "ID inválido");
    }

    const [publicacionActualizada, error] = await updatePublicacionService(id, updateData, userId);
    if (error)
      return handleErrorClient(res, 403, "No se pudo actualizar la publicación", error);

    handleSuccess(res, 200, "Publicación actualizada correctamente", publicacionActualizada);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function deletePublicacion(req, res) {
  try {
    const publicacionId = parseInt(req.params.id);
    const userId = req.user.id;

    const [result, error] = await deletePublicacionService(publicacionId, userId);

    if (error)
      return handleErrorClient(res, 403, "Error al eliminar publicación", error);

    return handleSuccess(res, 200, "Publicación eliminada correctamente");
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}