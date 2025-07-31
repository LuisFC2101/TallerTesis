import axios from '@services/root.service';

const crearSolicitud = async (data) => {
  try {
    const response = await axios.post('/solicitudes', data);
    return [response.data, null];
  } catch (error) {
    return [null, error];
  }
};

export default crearSolicitud;
