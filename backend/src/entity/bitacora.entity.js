//Aun tengo en duda el uso de esta entidad.
import { EntitySchema } from "typeorm";

const BitacoraAdmin = new EntitySchema({
  name: "BitacoraAdmin",
  tableName: "bitacora_admin",
  columns: {
    id: { type: "int", primary: true, generated: true },
    accion: { type: "text" },
    fecha_hora: { type: "timestamp with time zone", default: () => "CURRENT_TIMESTAMP" }
  },
  relations: {
    admin: {
      type: "many-to-one",
      target: "User",
      joinColumn: true,
      onDelete: "SET NULL"
    }
  }
});

export default BitacoraAdmin;