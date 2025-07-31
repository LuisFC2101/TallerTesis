// initialData/solicitudes.js
import Solicitud from "../../entity/solicitud.entity.js";
import Comuna from "../../entity/comunas.entity.js";
import { AppDataSource } from "../configDb.js";

async function createSolicitudes() {
  try {
    const repo = AppDataSource.getRepository(Solicitud);
    const comunaRepo = AppDataSource.getRepository(Comuna);

    const count = await repo.count();
    if (count > 0) return;

    const [tirua, canete] = await Promise.all([
      comunaRepo.findOneBy({ nombre: "Tirúa" }),
      comunaRepo.findOneBy({ nombre: "Cañete" }),
    ]);

    await repo.save([
      repo.create({
        nombre: "Juan Pérez",
        rut: "17.111.111-1",
        email: "juanperez@example.com",
        telefono: "912345678",
        nombreEmprendimiento: "Café Mapu",
        descripcion: "Café con identidad local.",
        motivo: "Difusión",
        comuna: tirua,
      }),
      repo.create({
        nombre: "Ana Millanao",
        rut: "16.222.222-2",
        email: "ana@example.com",
        telefono: "987654321",
        nombreEmprendimiento: "Ruka Artesanal",
        descripcion: "Artesanía lafkenche.",
        motivo: "Ventas",
        comuna: canete,
      }),
      repo.create({
        nombre: "Carlos Loncon",
        rut: "15.333.333-3",
        email: "cloncon@example.com",
        telefono: "923456789",
        nombreEmprendimiento: "Turismo Pewma",
        descripcion: "Tours por la zona costera.",
        motivo: "Promoción",
        comuna: tirua,
      }),
      repo.create({
        nombre: "Marcela Antilef",
        rut: "18.444.444-4",
        email: "mantilef@example.com",
        telefono: "934567890",
        nombreEmprendimiento: "Tejidos Ñaña",
        descripcion: "Ropa de lana natural.",
        motivo: "Participación en ferias",
        comuna: canete,
      })
    ]);

    console.log("* Solicitudes de registro creadas exitosamente");
  } catch (error) {
    console.error("Error al crear solicitudes:", error);
  }
}

export { createSolicitudes };
