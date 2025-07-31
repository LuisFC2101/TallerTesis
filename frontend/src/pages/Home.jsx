import { useEffect, useState } from "react";
import { getPublicaciones } from "../services/Publicaciones/getPublicaciones";
import getCategorias from "../services/Categorias/getCategorias";
import getComunas from "../services/Comunas/getComunas";
import { useNavigate } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import Buscador from "../components/Buscador";
import InfoPopup from "../components/InfoPopup"; 
import "../styles/index.css";
import "../styles/home.css";

export default function Home() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [publicacionesFiltradas, setPublicacionesFiltradas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [comunas, setComunas] = useState([]);
  const [error, setError] = useState(null);
  const [showInfoPopup, setShowInfoPopup] = useState(false);
  const [paginaActual, setPaginaActual] = useState(1);
  const publicacionesPorPagina = 12;
  const navigate = useNavigate();

  useEffect(() => {
    async function cargarDatos() {
      const [dataPub, errPub] = await getPublicaciones();
      const dataCat = await getCategorias();
      const [dataCom, errCom] = await getComunas();

      if (!errPub && Array.isArray(dataPub)) {
        setPublicaciones(dataPub);
        setPublicacionesFiltradas(dataPub);
      } else {
        setError(errPub);
      }

      if (Array.isArray(dataCat)) setCategorias(dataCat);
      if (!errCom && Array.isArray(dataCom)) setComunas(dataCom);
    }

    cargarDatos();
  }, []);

  const indexUltima = paginaActual * publicacionesPorPagina;
  const indexPrimera = indexUltima - publicacionesPorPagina;
  const publicacionesPaginas = publicacionesFiltradas.slice(indexPrimera, indexUltima);
  const totalPaginas = Math.ceil(publicacionesFiltradas.length / publicacionesPorPagina);

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
        {Array.isArray(publicacionesPaginas) && publicacionesPaginas.length > 0 ? (
          publicacionesPaginas.map((publi) => (
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

      {totalPaginas > 1 && (
        <div className="paginacion">
          {paginaActual > 1 && (
            <button className="pagina-btn" onClick={() => setPaginaActual(paginaActual - 1)}>
              Anterior
            </button>
          )}

          {Array.from({ length: totalPaginas }, (_, i) => i + 1)
            .filter((n) => n >= paginaActual && n < paginaActual + 3)
            .map((num) => (
              <button
                key={num}
                className={`pagina-btn ${paginaActual === num ? 'activa' : ''}`}
                onClick={() => setPaginaActual(num)}
              >
                {num}
              </button>
            ))}

          {paginaActual + 2 < totalPaginas && (
            <button className="pagina-btn" onClick={() => setPaginaActual(paginaActual + 1)}>
              Siguiente
            </button>
          )}
        </div>
      )}

      <section className="cta-registro">
        <h2 className="cta-titulo">¿Eres emprendedor de la zona?</h2>
        <p className="cta-subtitulo">
          Crea tu perfil y comienza a promocionar tu emprendimiento hoy mismo.
        </p>
        <button className="cta-boton" onClick={() => setShowInfoPopup(true)}>
          Contáctanos
        </button>
      </section>

      <InfoPopup show={showInfoPopup} setShow={setShowInfoPopup} title="Información de contacto">
        <p>Si deseas más información, escríbenos a:</p>
        <p><strong>📧 contacto@pewmatour.cl</strong></p>
        <p><strong>📞 +56 9 1234 5678</strong></p>
      </InfoPopup>
    </div>
  );
}
