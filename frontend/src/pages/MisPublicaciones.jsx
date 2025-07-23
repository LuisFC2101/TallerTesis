import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import getMisPublicaciones from '../services/Publicaciones/getMisPublicaciones';
import deletePublicacion from '../services/Publicaciones/deletePublicacion';
import '@styles/misPublicaciones.css'; // crea este archivo para los estilos

const MisPublicaciones = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarPublicaciones = async () => {
      try {
        const data = await getMisPublicaciones();
        setPublicaciones(data);
      } catch (error) {
        Swal.fire(Error, 'No se pudieron cargar tus publicaciones', error);
      }
    };

    cargarPublicaciones();
  }, []);

  const handleEliminar = async (id) => {
    const confirm = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará tu publicación de forma permanente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (confirm.isConfirmed) {
      try {
        await deletePublicacion(id);
        Swal.fire('Eliminado', 'Tu publicación fue eliminada correctamente', 'success');
        setPublicaciones((prev) => prev.filter((p) => p.id !== id));
      } catch (error) {
        Swal.fire(Error, 'No se pudo eliminar la publicación', error);
      }
    }
  };

  return (
    <div className="mis-publicaciones-container">
      <h2>Mis Publicaciones</h2>
      {publicaciones.length === 0 ? (
        <p className="mensaje-vacio">No tienes publicaciones registradas.</p>
      ) : (
        <div className="publicaciones-grid">
          {publicaciones.map((publi) => (
            <div key={publi.id} className="publicacion-card">
              <img
                src={publi.imagenes?.[0]?.url || 'https://via.placeholder.com/200'}
                alt={publi.titulo}
                className="publicacion-imagen"
              />
              <div className="publicacion-info">
                <h3>{publi.titulo}</h3>
                <p>{publi.descripcion}</p>
                <p><strong>Precio:</strong> ${publi.precio}</p>
                <p><strong>Ubicación:</strong> {publi.ubicacion}</p>
              </div>
              <div className="botones-publicacion">
                <button className="btn-editar" onClick={() => navigate(`/editar-publicacion/${publi.id}`)}>
                  Editar
                </button>
                <button className="btn-eliminar" onClick={() => handleEliminar(publi.id)}>
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MisPublicaciones;
