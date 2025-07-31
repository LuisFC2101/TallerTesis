import { EntitySchema } from "typeorm";

const Publicacion = new EntitySchema({
  name: "Publicacion",
  tableName: "publicaciones",
  columns: {
    id: { type: "int", primary: true, generated: true },
    titulo: { type: "varchar", length: 255 },
    descripcion: { type: "text" },
    precio: { type: "numeric" },
    ubicacion: { type: "varchar", nullable: true },
    estado: { type: "varchar", default: "pendiente" },
    createdAt: { type: "timestamp with time zone", default: () => "CURRENT_TIMESTAMP" },
    updatedAt: { type: "timestamp with time zone", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" }
  },
  relations: {
    usuario: {
      type: "many-to-one",
      target: "User",
      joinColumn: true,
      eager: true
    },
    categoria: {
      type: "many-to-one",
      target: "Categoria",
      joinColumn: true,
      eager: true
    },
    imagenes: {
    type: "one-to-many",
    target: "ImagenPublicacion",
    inverseSide: "publicacion",
    cascade: true,
    eager: true
  },
  emprendimiento: {
      type: "many-to-one",
      target: "Emprendimiento",
      joinColumn: true,
      eager: true
    },
    estadistica: {
      type: "one-to-one",
      target: "EstadisticaPublicacion",
      inverseSide: "publicacion",
      eager: true,
      cascade: true
    }
  }
});

export default Publicacion;
