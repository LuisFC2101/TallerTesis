import axios from '@services/root.service';

const getComunas = async () => {
  try {
    const response = await axios.get('/comunas');
    return [response.data, null]; 
  } catch (error) {
    return [null, error];
  }
};

export default getComunas;
