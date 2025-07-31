import axios from '../root.service';

const getMisPublicaciones = async () => {
  const response = await axios.get('/mias');
  console.log(" Mis publicaciones:", response.data);
  return response.data;
};

export default getMisPublicaciones;
