// initialData/categorias.js
import Categoria from "../../entity/categoria.entity.js";
import { AppDataSource } from "../configDb.js";

async function createCategorias() {
  try {
    const repo = AppDataSource.getRepository(Categoria);
    const count = await repo.count();
    if (count > 0) return;

    const categorias = ["Alojamiento", "Gastronomía", "Artesanía"];

    for (const nombre of categorias) {
      await repo.save(repo.create({ nombre }));
    }

    console.log("* Categorías creadas exitosamente");
  } catch (error) {
    console.error("Error al crear categorías:", error);
  }
}

export { createCategorias };
