import axios from '../root.service';

const getPublicacionById = async (id) => {
  const response = await axios.get(`/public/${id}`);
  return response.data;
};

export default getPublicacionById;
