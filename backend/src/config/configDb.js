import { DataSource } from "typeorm";
import { DATABASE, DB_USERNAME,   HOST,  PASSWORD } from "./configEnv.js";
import  User  from "../entity/user.entity.js";
import  Categoria  from "../entity/categoria.entity.js";
import  Comuna  from "../entity/comunas.entity.js";
import  Emprendimiento  from "../entity/emprendiento.entity.js";
import  Publicacion  from "../entity/publicacion.entity.js";
import  Solicitud  from "../entity/solicitud.entity.js";
import ImagenPublicacion from "../entity/imagen.entity.js";
import EstadisticaPublicacion from "../entity/estadisticas.entity.js";  
// importa todas las entidades necesarias

export const AppDataSource = new DataSource({
  type: "postgres",
  host: HOST,
  port: 5432,
  username: DB_USERNAME,
  password: PASSWORD,
  database: DATABASE,
  entities: [
    User, 
    Categoria, 
    Comuna, 
    Emprendimiento, 
    Publicacion, 
    Solicitud, 
    ImagenPublicacion,
    EstadisticaPublicacion
  ],
  synchronize: true,
  logging: false,
});
export async function connectDB(retries = 5, delay = 2000) {
  while (retries) {
    try {
      await AppDataSource.initialize();
      console.log(" Conexión a la base de datos establecida");
      return true;
    } catch (err) {
      console.error(" Error al conectar a la base de datos:", err);
      retries -= 1;
      console.log(` Reintentando conexión (${retries} restantes)...`);
      await new Promise(res => setTimeout(res, delay));
    }
  }
  return false;
}
