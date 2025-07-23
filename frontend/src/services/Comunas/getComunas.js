import axios from '../root.service';

const getComunas = async () => {
  const response = await axios.get('/comunas');
  return response.data;
};

export default getComunas;
