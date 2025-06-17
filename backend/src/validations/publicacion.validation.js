import Joi from "joi";

export const publicacionValidation = Joi.object({
  titulo: Joi.string().required().messages({
    "string.base": "El titulo debe ser un texto.",
    "any.required": "El campo titulo es obligatorio.",
  }),

  descripcion: Joi.string().required().messages({
    "string.base": "La descripcion debe ser un texto.",
    "any.required": "El campo descripcion es obligatorio.",
  }),

  precio: Joi.number().positive().required().messages({
    "number.base": "El precio debe ser un numero.",
    "number.positive": "El precio debe ser mayor que cero.",
    "any.required": "El campo precio es obligatorio.",
  }),

  ubicacion: Joi.string().allow(null, " ").messages({
    "string.base": "La ubicacion debe ser un texto.",
  }),

  categoriaId: Joi.number().integer().required().messages({
    "number.base": "El ID de categoría debe ser un numero.",
    "any.required": "El campo categoria es obligatorio.",
  }),

  emprendimientoId: Joi.number().integer().required().messages({
    "number.base": "El ID de emprendimiento debe ser un numero.",
    "any.required": "El campo emprendimiento es obligatorio.",
  }),

  imagenes: Joi.array().items(Joi.string().uri()).required().messages({
    "array.base": "El campo imagenes debe ser una lista de URLs.",
    "any.required": "Debe proporcionar al menos una imagen.",
  })
});
