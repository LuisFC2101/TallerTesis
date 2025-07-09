import axios from '@services/root.service';

export async function getComunas() {
  try {
    const response = await axios.get('/comunas');
    return [response.data, null];
  } catch (error) {
    return [null, error.message || "Error al cargar comunas"];
  }
}
