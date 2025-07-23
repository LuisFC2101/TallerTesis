import { useState, useEffect } from "react";
import "../styles/buscador.css";

const Buscador = ({
  publicaciones = [],
  onFiltrar,
  categorias = [],
  comunas = [],
}) => {
  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [comunaSeleccionada, setComunaSeleccionada] = useState("");

  useEffect(() => {
    const filtradas = publicaciones.filter((p) => {
      const coincideTexto =
        p.titulo?.toLowerCase().includes(busqueda.toLowerCase()) ||
        p.descripcion?.toLowerCase().includes(busqueda.toLowerCase());

      const coincideCategoria = categoriaSeleccionada
        ? p.categoria?.nombre === categoriaSeleccionada
        : true;

      const coincideComuna = comunaSeleccionada
        ? p.ubicacion === comunaSeleccionada
        : true;

      return coincideTexto && coincideCategoria && coincideComuna;
    });

    onFiltrar(filtradas);
  }, [
    busqueda,
    categoriaSeleccionada,
    comunaSeleccionada,
    publicaciones,
    onFiltrar,
  ]);

  return (
    <div className="buscador-container">
      <div className="input-con-icono">
        <img src="/src/assets/SearchIcon.svg" alt="Buscar" className="icono-busqueda" />
        <input
          type="text"
          className="buscador-input"
          placeholder="Buscar"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <div className="buscador-filtros">
        <select
          value={categoriaSeleccionada}
          onChange={(e) => setCategoriaSeleccionada(e.target.value)}
        >
          <option value="">Todas las categorías</option>
          {Array.isArray(categorias) &&
            categorias.map((cat) => (
              <option key={cat.id} value={cat.nombre}>
                {cat.nombre}
              </option>
            ))}
        </select>

        <select
          value={comunaSeleccionada}
          onChange={(e) => setComunaSeleccionada(e.target.value)}
        >
          <option value="">Todas las comunas</option>
          {Array.isArray(comunas) &&
            comunas.map((com) => (
              <option key={com.id} value={com.nombre}>
                {com.nombre}
              </option>
            ))}
        </select>

        <button
          className="btn-limpiar"
          onClick={() => {
            setBusqueda("");
            setCategoriaSeleccionada("");
            setComunaSeleccionada("");
          }}
          disabled={!busqueda && !categoriaSeleccionada && !comunaSeleccionada}
        >
          Limpiar filtros
        </button>
      </div>
    </div>
  );
};

export default Buscador;
