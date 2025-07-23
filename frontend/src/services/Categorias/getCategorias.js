import axios from '../root.service';

const getCategorias = async () => {
  const response = await axios.get('/categorias');
  return response.data;
};

export default getCategorias;
