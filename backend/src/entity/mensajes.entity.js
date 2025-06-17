import { EntitySchema } from "typeorm";

const Mensaje = new EntitySchema({
  name: "Mensaje",
  tableName: "mensajes",
  columns: {
    id: { type: "int", primary: true, generated: true },
    nombre_visitante: { type: "varchar", length: 255 },
    email: { type: "varchar", length: 255 },
    mensaje: { type: "text" },
    fecha_envio: { type: "timestamp with time zone", default: () => "CURRENT_TIMESTAMP" }, 
    estado: { type: "varchar", default: "no leído" }
  },
  relations: {
    publicacion: {
      type: "many-to-one",
      target: "Publicacion",
      joinColumn: true,
      onDelete: "CASCADE"
    }
  }
});

export default Mensaje;
