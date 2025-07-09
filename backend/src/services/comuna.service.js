import { AppDataSource } from "../config/configDb.js";
import Comuna from "../entity/comunas.entity.js";

export async function getAllComunasService() {
  const comunaRepo = AppDataSource.getRepository(Comuna);
  return await comunaRepo.find();
}
