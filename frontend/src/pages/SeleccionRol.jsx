import { useNavigate } from "react-router-dom";
import "../styles/seleccionRol.css";
import InfoPopup from "@components/InfoPopup.jsx";
import { useState } from "react";

const SeleccionRol = () => {
  const navigate = useNavigate();
  const [mostrarPopup, setMostrarPopup] = useState(false);

  return (
    <div className="seleccion-container">
      <h2 className="titulo">¿Cómo deseas registrarte?</h2>

      <div className="opciones">
        <div
          className="opcion-card turista"
          onClick={() => navigate("/register", { state: { rol: "turista" } })}
        >
          <img src="/src/assets/sun.svg" alt="Turista" className="rol-icono" />
          <h3>Turista</h3>
          <p>Explora y contacta emprendedores turísticos del Lago Lleu Lleu.</p>
        </div>

        <div
          className="opcion-card emprendedor"
          onClick={() => setMostrarPopup(true)}
        >
          <img src="/src/assets/emprende.svg" alt="Emprendedor" className="rol-icono" />
          <h3>Emprendedor</h3>
          <p>Publica tus servicios, artesanías o alojamientos en la plataforma.</p>
        </div>
      </div>

      <InfoPopup show={mostrarPopup} setShow={setMostrarPopup} title="Registro de Emprendedores">
      <p>Para registrar tu emprendimiento, contáctanos:</p>
      <p><strong>📧 Email:</strong> turismo@tirua.cl</p> 
      <p><strong>📞 Teléfono:</strong> +56 9 1234 5678</p>
      </InfoPopup>

    </div>
  );
};

export default SeleccionRol; // le pedi al chatgpt los los iconos de mail y telefono 
