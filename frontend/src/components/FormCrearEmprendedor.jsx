import { useEffect, useState } from 'react';
import Form from "@components/Form";
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import axios from '@services/root.service';
import getComunas from '@services/Comunas/getComunas.js';

const FormCrearEmprendedor = ({ onClose }) => {
  const [comunas, setComunas] = useState([]);

  useEffect(() => {
    const cargarComunas = async () => {
      const [data, error] = await getComunas();
      if (!error && Array.isArray(data)) {
        setComunas(data);
      } else {
        setComunas([]);
      }
    };
    cargarComunas();
  }, []);

  const handleSubmit = async (data) => {
    try {
      console.log("🔎 Datos enviados:", data);
      const response = await axios.post('/solicitudes', data);
      if (response.data) {
        showSuccessAlert('La solicitud fue registrada correctamente.');
        if (onClose) onClose();
      }
    } catch (error) {
      console.error("Error al enviar solicitud:", error);
      showErrorAlert('Error', 'Ocurrió un error al registrar la solicitud.');
    }
  };

  return (
    <Form
      title="Agregar Emprendedor"
      fields={[
        {
          label: "Nombre completo",
          name: "nombre",
          placeholder: "Nombre Apellido",
          fieldType: 'input',
          type: "text",
          required: true,
          minLength: 10,
          maxLength: 50,
        },
        {
          label: "RUT",
          name: "rut",
          placeholder: "22.222.222-2",
          fieldType: 'input',
          type: "text",
          required: true,
        },
        {
          label: "Correo electrónico",
          name: "email",
          placeholder: "example@gmail.cl",
          fieldType: 'input',
          type: "email",
          required: true,
        },
        {
          label: "Teléfono",
          name: "telefono",
          placeholder: "+569XXXXXXXX",
          fieldType: 'input',
          type: "text",
          required: true,
        },
        {
          label: "Nombre del emprendimiento",
          name: "nombreEmprendimiento",
          placeholder: "Nombre del negocio",
          fieldType: 'input',
          type: "text",
          required: true,
        },
        {
          label: "Descripción del emprendimiento",
          name: "descripcionEmprendimiento",
          placeholder: "¿Qué ofrece el emprendimiento?",
          fieldType: 'textarea',
          required: true,
        },
        {
          label: "Comuna",
          name: "comunaId",
          fieldType: "select",
          required: true,
          defaultValue: "",
          options: comunas.length > 0
            ? comunas.map((comuna) => ({
                label: comuna.nombre,
                value: comuna.id
              }))
            : [{ label: "No hay comunas disponibles", value: "", disabled: true }],
        },
        {
          label: "Motivo de la solicitud",
          name: "motivo",
          placeholder: "¿Por qué deseas registrar este emprendimiento?",
          fieldType: 'textarea',
          required: true,
        },
      ]}
      buttonText="Crear Emprendedor"
      onSubmit={handleSubmit}
    />
  );
};

export default FormCrearEmprendedor;
