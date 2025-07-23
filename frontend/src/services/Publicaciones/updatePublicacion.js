import axios from '../root.service';

const updatePublicacion = async (id, data) => {
  const response = await axios.patch(`/publicaciones/${id}`, data);
  return response.data;
};

export default updatePublicacion;
