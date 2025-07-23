import { findAllCategoriasService } from "../services/categoria.service.js";

export const getCategorias = async (req, res) => {
  try {
    const categorias = await findAllCategoriasService();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener categorías" });
  }
};
