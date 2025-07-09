import { getAllComunasService } from "../services/comuna.service.js";

export async function getComunasController(req, res) {
  try {
    const comunas = await getAllComunasService();
    res.status(200).json(comunas);
  } catch (error) {
    console.error("Error al obtener comunas:", error);
    res.status(500).json({ message: "Error al obtener comunas" });
  }
}
