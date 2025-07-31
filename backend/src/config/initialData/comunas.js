// initialData/comunas.js
import Comuna from "../../entity/comunas.entity.js";
import { AppDataSource } from "../configDb.js";

async function createComunas() {
  try {
    const repo = AppDataSource.getRepository(Comuna);
    const count = await repo.count();
    if (count > 0) return;

    const comunas = ["Tirúa", "Cañete"];

    for (const nombre of comunas) {
      await repo.save(repo.create({ nombre }));
    }

    console.log("* Comunas creadas exitosamente");
  } catch (error) {
    console.error("Error al crear comunas:", error);
  }
}

export { createComunas };
