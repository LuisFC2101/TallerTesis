import { AppDataSource } from "./configDb.js";
import { createUsers } from "./initialData/users.js";
import { createCategorias } from "./initialData/categorias.js";
import { createComunas } from "./initialData/comunas.js";
import { createEmprendimientos } from "./initialData/emprendimientos.js";
import { createPublicaciones } from "./initialData/publicaciones.js";
import { createSolicitudes } from "./initialData/solicitudes.js";

AppDataSource.initialize()
  .then(async () => {
    await createUsers();
    await createCategorias();
    await createComunas();
    await createEmprendimientos();
    await createPublicaciones();
    await createSolicitudes();
    console.log("\u2705 Datos iniciales cargados correctamente");
  })
  .catch((err) => {
    console.error("Error al inicializar la base de datos:", err);
  });
