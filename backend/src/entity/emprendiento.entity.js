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
      joinColumn: {
        name: "usuarioId",
        
      },
      eager: true,
      onDelete: "SET NULL"
    },
    comuna: {
      type: "many-to-one",
      target: "Comuna",
      joinColumn: {
        name: "comunaId",
      },
      eager: true,
      onDelete: "CASCADE"
    }
  }
});

export default Emprendimiento;
