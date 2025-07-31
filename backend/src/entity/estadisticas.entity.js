import { EntitySchema } from "typeorm";

const EstadisticaPublicacion = new EntitySchema({
  name: "EstadisticaPublicacion",
  tableName: "estadisticas_publicacion",
  columns: {
    id: { type: "int", primary: true, generated: true },
    visitas: { type: "int", default: 0 },
    contactos_recibidos: { type: "int", default: 0 },
    ultima_actualizacion: { type: "timestamp with time zone", default: () => "CURRENT_TIMESTAMP" }
  },
  relations: {
    publicacion: {
      type: "one-to-one",
      target: "Publicacion",
      inverseSide: "estadisticas",
      joinColumn: true,
      onDelete: "CASCADE"
    }
  }
});

export default EstadisticaPublicacion;