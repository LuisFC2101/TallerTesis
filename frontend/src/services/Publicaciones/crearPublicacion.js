import axios from '../root.service';

const crearPublicacion = async (data) => {
  const response = await axios.post('/publicaciones', data);
  return response.data;
};

export default crearPublicacion;
