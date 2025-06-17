import { EntitySchema } from "typeorm";

const SolicitudRegistro = new EntitySchema({
  name: "SolicitudRegistro",
  tableName: "solicitudes_registro",
  columns: {
    id: { type: "int", primary: true, generated: true },
    motivo: { type: "text" },
    estado: { type: "varchar", default: "pendiente" },
    fechaSolicitud: { type: "timestamp with time zone", default: () => "CURRENT_TIMESTAMP" },
    nombre: { type: "varchar", nullable: false }, 
    rut: { type: "varchar", nullable: false },     
    email: { type: "varchar", nullable: false },
  },
 
  relations: {
    usuario: {
      type: "many-to-one",
      target: "User",
      joinColumn: true,
      eager: true
    }
  },
  relations: {
  comuna: {
    type: "many-to-one",
    target: "Comuna",
    joinColumn: true,
    eager: false, 
    nullable: false,
  },
}

});

export default SolicitudRegistro;
