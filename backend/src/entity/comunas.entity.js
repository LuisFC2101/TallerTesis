import { EntitySchema } from "typeorm";

const Comuna = new EntitySchema({
  name: "Comuna",
  tableName: "comunas",
  columns: {
    id: { type: "int", primary: true, generated: true },
    nombre: { type: "varchar", length: 100 }
  }
});

export default Comuna;
