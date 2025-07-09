import axios from "../root.service.js";

export async function getPublicaciones({ categoriaId = "", query = "" } = {}) {
  try {
    const params = {};
    if (categoriaId) params.categoriaId = categoriaId;
    if (query) params.query = query;

    const response = await axios.get("/public", { params });
    return [response.data, null];
  } catch (error) {
    console.error("Error al obtener publicaciones públicas:", error);
    return [null, "No se pudieron cargar las publicaciones"];
  }
}
