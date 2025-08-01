import { createUsers } from "./initialData/users.js";
import { createCategorias } from "./initialData/categorias.js";
import { createComunas } from "./initialData/comunas.js";
import { createEmprendimientos } from "./initialData/emprendimientos.js";
import { createPublicaciones } from "./initialData/publicaciones.js";
import { createSolicitudes } from "./initialData/solicitudes.js";

export async function runInitialSetup() {
  try {
    await createUsers();
    await createCategorias();
    await createComunas();
    await createEmprendimientos();
    await createPublicaciones();
    await createSolicitudes();
    console.log("✅ Datos iniciales cargados correctamente");
  } catch (err) {
    console.error("❌ Error cargando datos iniciales:", err);
  }
}
