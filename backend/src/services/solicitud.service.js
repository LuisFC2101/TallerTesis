"use strict";
import Solicitud from "../entity/solicitud.entity.js";
import User from "../entity/user.entity.js";
import { AppDataSource } from "../config/configDb.js";
import { encryptPassword } from "../helpers/bcrypt.helper.js";

export async function createSolicitudService(data) {
  try {
    const solicitudRepository = AppDataSource.getRepository(Solicitud);

    const nuevaSolicitud = solicitudRepository.create({
      nombre: data.nombre,
      rut: data.rut,
      email: data.email,
      telefono: data.telefono,
      descripcionEmprendimiento: data.descripcionEmprendimiento,
      nombreEmprendimiento: data.nombreEmprendimiento,
      motivo: data.motivo,
      comuna: { id: data.comunaId },
    });

    await solicitudRepository.save(nuevaSolicitud);
    return [nuevaSolicitud, null];
  } catch (error) {
    console.error("Error al crear solicitud de registro:", error);
    return [null, "Error interno del servidor al registrar la solicitud"];
  }
}

export async function getSolicitudesService() {
  try {
    const solicitudRepository = AppDataSource.getRepository(Solicitud);
    const solicitudes = await solicitudRepository.find({
      relations: ["comuna"],
      order: { fechaSolicitud: "DESC" },
    });
    return [solicitudes, null];
  } catch (error) {
    console.error("Error al obtener solicitudes:", error);
    return [null, "Error interno del servidor al obtener las solicitudes"];
  }
}

export async function aceptarSolicitudService(id) {
  try {
    const solicitudRepository = AppDataSource.getRepository(Solicitud);
    const userRepository = AppDataSource.getRepository(User);

    const solicitud = await solicitudRepository.findOne({
      where: { id },
      relations: ["comuna"],
    });

    if (!solicitud) {
      return [null, "Solicitud no encontrada"];
    }
    if (solicitud.estado !== "pendiente") {
      return [null, `La solicitud ya fue ${solicitud.estado}. No se puede aceptar nuevamente.`];
    }


    solicitud.estado = "aceptada";
    await solicitudRepository.save(solicitud);

    const rutLimpio = solicitud.rut.replace(/[^a-zA-Z0-9]/g, "");
    const newUser = userRepository.create({
      nombreCompleto: solicitud.nombre,
      rut: solicitud.rut,
      email: solicitud.email,
      password: await encryptPassword(rutLimpio), // temporal
      rol: "emprendedor",
    });

    await userRepository.save(newUser);

    return [newUser, null];
  } catch (error) {
    console.error("Error al aceptar solicitud:", error);
    return [null, "Error interno al aceptar la solicitud"];
  }
}

export async function rechazarSolicitudService(id) {
  try {
    const solicitudRepository = AppDataSource.getRepository(Solicitud);
    const solicitud = await solicitudRepository.findOneBy({ id });

    if (!solicitud) {
      return [null, "Solicitud no encontrada"];
    }
    if (solicitud.estado == "aceptada") {
      return [null, `La solicitud ya fue ${solicitud.estado}. No se puede rechazar, hagalo manualmente.`];
    }


    solicitud.estado = "rechazada";
    await solicitudRepository.save(solicitud);

    return [true, null];
  } catch (error) {
    console.error("Error al rechazar solicitud:", error);
    return [null, "Error interno al rechazar la solicitud"];
  }
}
