// initialData/publicaciones.js
import Publicacion from "../../entity/publicacion.entity.js";
import Emprendimiento from "../../entity/emprendiento.entity.js";
import Categoria from "../../entity/categoria.entity.js";
import Imagen from "../../entity/imagen.entity.js";
import Estadistica from "../../entity/estadisticas.entity.js";
import { AppDataSource } from "../configDb.js";

async function createPublicaciones() {
  try {
    const pubRepo = AppDataSource.getRepository(Publicacion);
    const empRepo = AppDataSource.getRepository(Emprendimiento);
    const catRepo = AppDataSource.getRepository(Categoria);
    const imgRepo = AppDataSource.getRepository(Imagen);
    const statsRepo = AppDataSource.getRepository(Estadistica);

    const count = await pubRepo.count();
    if (count > 0) return;

    const [cat1, cat2, cat3] = await Promise.all([
      catRepo.findOneBy({ nombre: "Alojamiento" }),
      catRepo.findOneBy({ nombre: "Gastronomía" }),
      catRepo.findOneBy({ nombre: "Artesanía" }),
    ]);

    const emps = await empRepo.find();
    if (emps.length < 3) return;

    const url = "https://cf.bstatic.com/xdata/images/hotel/max1024x768/169318614.jpg?k=ac301eca8f5f427ea3d4ab90ff488093221e448fd1c0b9c2d335d5b35a1b1bdb&o=&hp=1";

    for (let i = 1; i <= 13; i++) {
      const publicacion = pubRepo.create({
        titulo: `Publicación ${i}`,
        descripcion: `Descripción breve de la publicación ${i}`,
        ubicacion: "Sector Lleu Lleu Norte",
        precio: 99000,
        emprendimiento: emps[i % 3],
        categoria: [cat1, cat2, cat3][i % 3],
      });

      const savedPub = await pubRepo.save(publicacion);

      await imgRepo.save(
        imgRepo.create({ url, publicacion: savedPub })
      );

      await statsRepo.save(
        statsRepo.create({ publicacion: savedPub })
      );
    }

    console.log("* Publicaciones con imagen y estadísticas creadas exitosamente");
  } catch (error) {
    console.error("Error al crear publicaciones:", error);
  }
}

export { createPublicaciones };
