import axios from '../root.service';

const getMisPublicaciones = async () => {
  const response = await axios.get('/mias');
  return response.data;
};

export default getMisPublicaciones;
