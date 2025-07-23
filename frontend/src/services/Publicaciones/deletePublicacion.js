import axios from '../root.service';

const deletePublicacion = async (id) => {
  const response = await axios.delete(`/publicaciones/${id}`);
  return response.data;
};

export default deletePublicacion;
