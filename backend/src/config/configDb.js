import { User } from "../entity/user.entity.js";
import { Categoria } from "../entity/categoria.entity.js";
import { Comuna } from "../entity/comuna.entity.js";
import { Emprendimiento } from "../entity/emprendimiento.entity.js";
import { Publicacion } from "../entity/publicacion.entity.js";
import { Solicitud } from "../entity/solicitud.entity.js";
// importa todas las entidades necesarias

export const AppDataSource = new DataSource({
  type: "postgres",
  host: HOST,
  port: 5432,
  username: DB_USERNAME,
  password: PASSWORD,
  database: DATABASE,
  entities: [User, Categoria, Comuna, Emprendimiento, Publicacion, Solicitud],
  synchronize: true,
  logging: false,
});
