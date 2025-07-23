import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "@services/root.service.js";
import "@styles/publicacionDetalle.css";

const PublicacionDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [publicacion, setPublicacion] = useState(null);
  const [error, setError] = useState(null);

  const usuarioLogueado = sessionStorage.getItem("usuario") !== null;

  useEffect(() => {
    const fetchPublicacion = async () => {
      try {
        const response = await axios.get(`/public/${id}`);
        setPublicacion(response.data);
      } catch (err) {
        console.error("Error al obtener la publicación:", err);
        setError("No se pudo cargar la publicación.");
      }
    };

    fetchPublicacion();
  }, [id]);

  if (error) return <p className="mensaje-error">{error}</p>;
  if (!publicacion) return <p className="mensaje-cargando">Cargando publicación...</p>;

  const { titulo, descripcion, precio, ubicacion, categoria, imagenes, emprendimiento, usuario } = publicacion;

  return (
    <div className="detalle-container">
      <div className="detalle-card">
        <h1 className="detalle-titulo">{titulo}</h1>

        <div className="detalle-imagen">
          <img src={imagenes?.[0]?.url || "https://via.placeholder.com/800x400"} alt={titulo} />
        </div>

        <div className="detalle-info">
          <p><strong>Descripción:</strong> {descripcion}</p>
          <p><strong>Precio:</strong> ${precio}</p>
          <p><strong>Ubicación:</strong> {ubicacion}</p>
          <p><strong>Categoría:</strong> {categoria?.nombre}</p>
          <p><strong>Emprendimiento:</strong> {emprendimiento?.nombre}</p>

          {usuarioLogueado ? (
            <p><strong>Contacto:</strong> {usuario?.email}</p>
          ) : (
            <button className="btn-login" onClick={() => navigate("/auth")}>
              Inicia sesión para ver el contacto
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicacionDetalle;
