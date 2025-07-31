import { getUsuariosMasActivosService } from "../services/estadisticas.service.js";

export const getUsuariosMasActivosController = async (req, res) => {
  try {
    const data = await getUsuariosMasActivosService();
    res.status(200).json(data);
  } catch (error) {
    console.error("ERROR EN CONSULTA DE ESTADÍSTICAS:", error); // <--- muestra en consola
    res.status(500).json({
      message: "Error al obtener usuarios más activos",
      error: {
        message: error.message,
        stack: error.stack,
        query: error.query,
        driverError: error.driverError
      }
    });
  }
};
