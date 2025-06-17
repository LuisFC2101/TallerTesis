import { EntitySchema } from "typeorm";

const ImagenPublicacion = new EntitySchema({
  name: "ImagenPublicacion",
  tableName: "imagenes_publicacion",
  columns: {
    id: { type: "int", primary: true, generated: true },
    url: { type: "text" }
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

export default ImagenPublicacion;