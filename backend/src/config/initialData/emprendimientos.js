// initialData/emprendimientos.js
import Emprendimiento from "../../entity/emprendiento.entity.js";
import User from "../../entity/user.entity.js";
import Comuna from "../../entity/comunas.entity.js";
import { AppDataSource } from "../configDb.js";

async function createEmprendimientos() {
  try {
    const repo = AppDataSource.getRepository(Emprendimiento);
    const userRepo = AppDataSource.getRepository(User);
    const comunaRepo = AppDataSource.getRepository(Comuna);

    const count = await repo.count();
    if (count > 0) return;

    const user1 = await userRepo.findOneBy({ email: "emprende2025@gmail.cl" });
    const user2 = await userRepo.findOneBy({ email: "granjefe@gmail.cl" });
    const comuna1 = await comunaRepo.findOneBy({ nombre: "Tirúa" });
    const comuna2 = await comunaRepo.findOneBy({ nombre: "Cañete" });

    await repo.save([
      repo.create({
        nombre: "Camping Pewma",
        descripcion: "Espacio natural junto al Lago Lleu Lleu.",
        telefono: "987654321",
        usuario: user1,
        comuna: comuna1,
      }),
      repo.create({
        nombre: "Cabañas Lafken",
        descripcion: "Alojamiento rural con identidad mapuche.",
        telefono: "912345678",
        usuario: user1,
        comuna: comuna2,
      }),
      repo.create({
        nombre: "Artesanías Ñuke",
        descripcion: "Productos hechos a mano con materiales locales.",
        telefono: "911222333",
        usuario: user2,
        comuna: comuna1,
      })
    ]);

    console.log("* Emprendimientos creados exitosamente");
  } catch (error) {
    console.error("Error al crear emprendimientos:", error);
  }
}

export { createEmprendimientos };
