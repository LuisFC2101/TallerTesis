import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from "@components/Form";
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import axios from '@services/root.service';
import '@styles/form.css';
import { getComunas } from '@services/Comunas/getComunas.js';

const RegisterEmprendedor = () => {
  const navigate = useNavigate();
  const [comunas, setComunas] = useState([]);

  useEffect(() => {
    const cargarComunas = async () => {
      const [data, error] = await getComunas();
      if (!error && data) {
        setComunas(data);
      }
    };
    cargarComunas();
  }, []);

  const handleSubmit = async (data) => {
    try {
      const response = await axios.post('/solicitudes', data);
      if (response.data) {
        showSuccessAlert('Tu solicitud será revisada por un administrador. Pronto recibirás una respuesta de aceptación o rechazo.');
        setTimeout(() => navigate('/auth'), 3000);
      }
    } catch (error) {
      console.error("Error al enviar solicitud:", error);
      showErrorAlert('Error', 'Ocurrió un error al enviar la solicitud.');
    }
  };

  return (
    <main className="container">
      <Form
        title="Registro de Emprendedor"
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
            placeholder: "¿Qué ofrece tu emprendimiento?",
            fieldType: 'textarea',
            required: true,
          },
          {
            label: "Comuna",
            name: "comunaId",
            fieldType: "select",
            required: true,
            options: comunas.map((comuna) => ({
              label: comuna.nombre,
              value: comuna.id
            })),
          },
          {
            label: "Motivo de la solicitud",
            name: "motivo",
            placeholder: "Motivo de tu registro",
            fieldType: 'textarea',
            required: true,
          },
        ]}
        buttonText="Enviar Solicitud"
        onSubmit={handleSubmit}
        footerContent={<p>¿Ya tienes cuenta? <a href="/auth">Inicia sesión aquí</a></p>}
      />
    </main>
  );
};

export default RegisterEmprendedor;
