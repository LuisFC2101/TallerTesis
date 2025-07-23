import { AppDataSource } from "../config/configDb.js";
import Emprendimiento from "../entity/emprendiento.entity.js";

const emprendimientoRepository = AppDataSource.getRepository(Emprendimiento);

export const findMisEmprendimientosService = async (usuarioId) => {
  return await emprendimientoRepository.find({
    where: { usuario: { id: usuarioId } },
  });
};
