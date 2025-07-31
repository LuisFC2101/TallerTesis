import crearSolicitud from '@services/Solicitudes/crearSolicitud';
import { showSuccessAlert, showErrorAlert } from '@helpers/sweetAlert';

const useCrearSolicitud = () => {
  const handleCrearSolicitud = async (data, onSuccess) => {
    const [res, error] = await crearSolicitud(data);
    if (res) {
      showSuccessAlert('Solicitud enviada correctamente');
      if (onSuccess) onSuccess(); 
    } else {
      showErrorAlert('Error al enviar la solicitud');
      console.error(error);
    }
  };

  return { handleCrearSolicitud };
};

export default useCrearSolicitud;
