import { AppDataSource } from "../config/configDb.js";
import  EstadisticaPublicacion  from "../entity/estadisticas.entity.js";
import  Publicacion  from "../entity/publicacion.entity.js";
import  User  from "../entity/user.entity.js";

export const getUsuariosMasActivosService = async () => {
  const result = await AppDataSource
    .getRepository(EstadisticaPublicacion)
    .createQueryBuilder("estadistica")
    .innerJoin("estadistica.publicacion", "publicacion")
    .innerJoin("publicacion.usuario", "usuario")
    .select(`"usuario"."id"`, "usuarioId")
    .addSelect(`"usuario"."email"`, "email")
    .addSelect(`"usuario"."nombreCompleto"`, "nombre")
    .addSelect(`SUM("estadistica"."visitas")`, "totalVisitas")
    .addSelect(`SUM("estadistica"."contactos_recibidos")`, "totalContactos")
    .groupBy(`"usuario"."id"`)
    .addGroupBy(`"usuario"."email"`)
    .addGroupBy(`"usuario"."nombreCompleto"`)
    .orderBy(`"totalVisitas"`, "DESC")

    .getRawMany();

  return result;
};
