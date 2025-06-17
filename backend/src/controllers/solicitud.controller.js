"use strict";
import {
    aceptarSolicitudService,
    createSolicitudService,
    getSolicitudesService,
    rechazarSolicitudService,
} from "../services/solicitud.service.js";
import {
    handleErrorClient,
    handleErrorServer,
    handleSuccess,
} from "../handlers/responseHandlers.js";

export async function createSolicitud(req, res) {
  try {
        const [solicitud, error] = await createSolicitudService(req.body);
        if (error) return handleErrorClient(res, 400, "Error al crear la solicitud", error);

        handleSuccess(res, 201, "Solicitud enviada correctamente", solicitud);
  } catch (error) {
        handleErrorServer(res, 500, error.message);
  }
}

export async function getSolicitudes(req, res) {
  try {
        const [solicitudes, error] = await getSolicitudesService();
        if (error) return handleErrorClient(res, 400, "Error al obtener solicitudes", error);

    handleSuccess(res, 200, "Solicitudes obtenidas correctamente", solicitudes);
  } catch (error) {
        handleErrorServer(res, 500, error.message);
  }
}

export async function aceptarSolicitud(req, res) {
  try {
        const { id } = req.params;
        const [usuarioCreado, error] = await aceptarSolicitudService(id);
        if (error) return handleErrorClient(res, 400, "No se pudo aceptar la solicitud", error);

    handleSuccess(res, 200, "Solicitud aceptada y usuario creado", usuarioCreado);
  } catch (error) {
        handleErrorServer(res, 500, error.message);
  }
}

export async function rechazarSolicitud(req, res) {
  try {
        const { id } = req.params;
        const [rechazoExitoso, error] = await rechazarSolicitudService(id);
    if (error) return handleErrorClient(res, 400, "No se pudo rechazar la solicitud", error);

        handleSuccess(res, 200, "Solicitud rechazada correctamente", rechazoExitoso);
  } catch (error) {
        handleErrorServer(res, 500, error.message);
  }
}

