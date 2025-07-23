import { useEffect, useState } from "react";
import { getPublicaciones } from "../services/Publicaciones/getPublicaciones";
import getCategorias from "../services/Categorias/getCategorias";
import getComunas from "../services/Comunas/getComunas";
import "../styles/index.css";
import "../styles/home.css";
import { useNavigate } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import Buscador from "../components/Buscador";

export default function Home() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [publicacionesFiltradas, setPublicacionesFiltradas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [comunas, setComunas] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function cargarDatos() {
      const [dataPub, errPub] = await getPublicaciones();
      const dataCat = await getCategorias();
      const dataCom = await getComunas();

      if (errPub) {
        setError(errPub);
        setPublicaciones([]);
        setPublicacionesFiltradas([]);
      } else {
        setPublicaciones(dataPub);
        setPublicacionesFiltradas(dataPub);
      }

      if (dataCat) setCategorias(dataCat);
      if (dataCom) setComunas(dataCom);
    }

    cargarDatos();
  }, []);

  return (
    <div className="home-container">
      <HeroSection
        title="Bienvenido a PewmaTour"
        subtitle="Descubre emprendimientos turísticos y artesanales del Lago Lleu Lleu"
      />

      <Buscador
        publicaciones={publicaciones}
        onFiltrar={setPublicacionesFiltradas}
        categorias={categorias}
        comunas={comunas}
      />

      <section className="intro-section">
        <h1 className="intro-title">Explora el Lago Lleu Lleu</h1>
        <p className="intro-subtitle">
          Encuentra experiencias únicas, productos artesanales y servicios turísticos ofrecidos por emprendedores locales.
        </p>
      </section>

      {error && <p className="error">{error}</p>}

      <div id="publicaciones" className="publicaciones-grid">
        {Array.isArray(publicacionesFiltradas) && publicacionesFiltradas.length > 0 ? (
          publicacionesFiltradas.map((publi) => (
            <div key={publi.id} className="publicacion-card">
              <img
                src={publi.imagenes?.[0]?.url || "https://via.placeholder.com/300x200"}
                alt={publi.titulo}
                className="publicacion-imagen"
              />
              <div className="publicacion-info">
                <h3>{publi.titulo}</h3>
                <p className="descripcion">{publi.descripcion}</p>
                <span className="precio">${publi.precio}</span>
                <p className="ubicacion">{publi.ubicacion}</p>
                <button
                  className="ver-detalle-btn"
                  onClick={() => navigate(`/publicacion/${publi.id}`)}
                >
                  Ver más
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No hay publicaciones disponibles.</p>
        )}
      </div>

      <section className="cta-registro">
        <h2 className="cta-titulo">¿Eres emprendedor de la zona?</h2>
        <p className="cta-subtitulo">
          Crea tu perfil y comienza a promocionar tu emprendimiento hoy mismo.
        </p>
        <button className="cta-boton" onClick={() => navigate("/register-emprendedor")}>
          Contáctanos
        </button>
      </section>
    </div>
  );
}
