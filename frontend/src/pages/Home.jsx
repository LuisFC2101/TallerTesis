import { useEffect, useState } from "react";
import { getPublicaciones } from "../services/Publicaciones/getPublicaciones";
import "../styles/index.css";
import "../styles/home.css";
import { useNavigate } from "react-router-dom";
import HeroSection from "../components/HeroSection";

export default function Home() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function cargarPublicaciones() {
      const [data, err] = await getPublicaciones();
      if (err) {
        setError(err);
        setPublicaciones([]); 
      } else {
        setPublicaciones(data);
      }
    }

    cargarPublicaciones();
  }, []);

  return (
    <div className="home-container">
      <HeroSection />
      <h1>Xplora el Lago Lleu Lleu</h1>

      {error && <p className="error">{error}</p>}

      <div className="publicaciones-grid">
        {Array.isArray(publicaciones) && publicaciones.length > 0 ? (
          publicaciones.map((publi) => (
            <div key={publi.id} className="publicacion-card">
              <img
                src={publi.imagenes?.[0]?.url || "https://via.placeholder.com/300x200"}
                alt={publi.titulo}
                className="publicacion-imagen"
              />
              <h3>{publi.titulo}</h3>
              <p>{publi.descripcion}</p>
              <span className="precio">${publi.precio}</span>
              <p className="ubicacion">{publi.ubicacion}</p>
              <button
                className="ver-detalle-btn"
                onClick={() => navigate(`/publicacion/${publi.id}`)}
                >
                Ver mas
              </button>

            </div>
          ))
        ) : (
          <p>No hay publicaciones disponibles.</p>
        )}
      </div>
    </div>
  );
}
