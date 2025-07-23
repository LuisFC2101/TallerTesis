import axios from '../root.service';

const getMisEmprendimientos = async () => {
  const response = await axios.get('/emprendimientos/mios');
  return response.data;
};

export default getMisEmprendimientos;
