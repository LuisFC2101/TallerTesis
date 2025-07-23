import { useNavigate } from 'react-router-dom';
import { login } from '@services/auth.service.js';
import Form from '@components/Form';
import useLogin from '@hooks/auth/useLogin.jsx';
import '@styles/form.css';

const Login = () => {
  const navigate = useNavigate();
  const {
    errorEmail,
    errorPassword,
    errorData,
    handleInputChange
  } = useLogin();

  const loginSubmit = async (data) => {
    try {
      const response = await login(data);
      if (response.status === 'Success') {
        navigate('/home');
      } else if (response.status === 'Client error') {
        errorData(response.details);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="login-layout">
      <div
        className="login-left"
        style={{
          backgroundImage: `url('/fondo.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>

      <div className="login-right">
        <div className="form-wrapper">
          <Form
            title="Iniciar sesión"
            fields={[
              {
                label: "Correo electrónico",
                name: "email",
                placeholder: "Correo electrónico",
                fieldType: 'input',
                type: "email",
                required: true,
                errorMessageData: errorEmail,
                onChange: (e) => handleInputChange('email', e.target.value),
              },
              {
                label: "Contraseña",
                name: "password",
                placeholder: "Contraseña",
                fieldType: 'input',
                type: "password",
                required: true,
                errorMessageData: errorPassword,
                onChange: (e) => handleInputChange('password', e.target.value)
              }
            ]}
            buttonText="Iniciar sesión"
            onSubmit={loginSubmit}
            footerContent={
              <p className="extra-login">
                ¿No tienes cuenta? <a href="/seleccion-rol">¡Regístrate aquí!</a>
              </p>
            }
          />

          {/* Botón para volver al inicio */}
          <div className="volver-inicio">
            <a href="/">Volver al inicio</a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
