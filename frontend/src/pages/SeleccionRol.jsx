import { useNavigate } from "react-router-dom";
import "../styles/seleccionRol.css"; // Asegúrate de crear este archivo

const SeleccionRol = () => {
  const navigate = useNavigate();

  return (
    <div className="seleccion-container">
      <h2 className="titulo">¿Cómo deseas registrarte?</h2>

      <div className="opciones">
        <div className="opcion-card turista" onClick={() => navigate("/register")}>
          <img src="/src/assets/sun.svg" alt="Turista" className="rol-icono" />
          <h3>Turista</h3>
          <p>Explora y contacta emprendedores turísticos del Lago Lleu Lleu.</p>
        </div>

        <div className="opcion-card emprendedor" onClick={() => navigate("/register/emprendedor")}>
          <img src="/src/assets/emprende.svg" alt="Emprendedor" className="rol-icono" />
          <h3>Emprendedor</h3>
          <p>Publica tus servicios, artesanías o alojamientos en la plataforma.</p>
        </div>
      </div>
    </div>
  );
};

export default SeleccionRol;
