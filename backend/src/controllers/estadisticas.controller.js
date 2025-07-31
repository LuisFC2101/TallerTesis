import { registrarVisitaService } from "../services/estadisticas.service.js";

export const registrarVisitaController = async (req, res) => {
  try {
    const publicacionId = parseInt(req.params.id);
    if (isNaN(publicacionId)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const response = await registrarVisitaService(publicacionId);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error al registrar visita:", error);
    res.status(500).json({ message: "Error al registrar visita", error: error.message });
  }
};
