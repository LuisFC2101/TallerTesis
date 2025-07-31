import { EntitySchema } from "typeorm";

const SolicitudRegistro = new EntitySchema({
  name: "SolicitudRegistro",
  tableName: "solicitudes_registro",
  columns: {
    id: { type: "int", primary: true, generated: true },
    nombre: { type: "varchar", nullable: false },
    rut: { type: "varchar", nullable: false },
    email: { type: "varchar", nullable: false },
    telefono: { type: "varchar", nullable: true },
    nombreEmprendimiento: { type: "varchar", nullable: true },
    descripcionEmprendimiento: { type: "text", nullable: true },
    motivo: { type: "text" },
    estado: { type: "varchar", default: "pendiente" },
    fechaSolicitud: {
      type: "timestamp with time zone",
      default: () => "CURRENT_TIMESTAMP"
    }
  },
  relations: {
    usuario: {
      type: "many-to-one",
      target: "User",
      joinColumn: {
        name: "usuarioId",
      },
      onDelete: "SET NULL",
      nullable: true,
    },
    comuna: {
      type: "many-to-one",
      target: "Comuna",
      joinColumn: true,
      eager: false,
      nullable: false
    }
  }
});

export default SolicitudRegistro;
