import { findMisEmprendimientosService } from "../services/emprendimiento.service.js";

export const getMisEmprendimientos = async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const emprendimientos = await findMisEmprendimientosService(usuarioId);
    res.json(emprendimientos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener emprendimientos" });
  }
};
