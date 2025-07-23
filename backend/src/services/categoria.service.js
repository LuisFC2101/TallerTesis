import { AppDataSource } from "../config/configDb.js";
import Categoria from "../entity/categoria.entity.js";

const categoriaRepository = AppDataSource.getRepository(Categoria);

export const findAllCategoriasService = async () => {
  return await categoriaRepository.find();
};
