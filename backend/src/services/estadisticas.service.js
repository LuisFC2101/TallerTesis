import { AppDataSource } from "../config/configDb.js";
import EstadisticaPublicacion from "../entity/estadisticas.entity.js";

export const registrarVisitaService = async (publicacionId) => {
  const repo = AppDataSource.getRepository(EstadisticaPublicacion);

  const estadistica = await repo.findOne({
    where: { publicacion: { id: publicacionId } },
    relations: ["publicacion"]
  });

  if (!estadistica) {
    throw new Error("No se encontró estadística para esta publicación");
  }

  estadistica.visitas += 1;
  estadistica.ultima_actualizacion = new Date();

  await repo.save(estadistica);

  return { message: "Visita registrada correctamente" };
};
