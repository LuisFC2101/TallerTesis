import { EntitySchema } from "typeorm";

const Categoria = new EntitySchema({
  name: "Categoria",
  tableName: "categorias",
  columns: {
    id: { type: "int", primary: true, generated: true },
    nombre: { type: "varchar", length: 100 },
    descripcion: { type: "text", nullable: true }
  }
});

export default Categoria;