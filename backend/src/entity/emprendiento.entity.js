import { EntitySchema } from "typeorm";

const Emprendimiento = new EntitySchema({
  name: "Emprendimiento",
  tableName: "emprendimientos",
  columns: {
    id: { type: "int", primary: true, generated: true },
    nombre: { type: "varchar", length: 255 },
    descripcion: { type: "text" },
    direccion: { type: "varchar", nullable: true },
    estado: { type: "varchar", default: "pendiente" },
    creadoEn: { type: "timestamp with time zone", default: () => "CURRENT_TIMESTAMP" }
  },
  relations: {
    usuario: {
      type: "many-to-one",
      target: "User",
      joinColumn: true,
      eager: true
    },
    comuna: {
      type: "many-to-one",
      target: "Comuna",
      joinColumn: true,
      eager: true
    }
  }
});

export default Emprendimiento;
