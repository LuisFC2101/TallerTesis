import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import getMisPublicaciones from '../services/Publicaciones/getMisPublicaciones';
import deletePublicacion from '../services/Publicaciones/deletePublicacion';

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
    <div className="mis-publicaciones-container" style={{ padding: '2rem' }}>
      <h2>Mis Publicaciones</h2>
      {publicaciones.length === 0 ? (
        <p>No tienes publicaciones registradas.</p>
      ) : (
        <div className="publicaciones-grid" style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
          {publicaciones.map((publi) => (
            <div
              key={publi.id}
              className="publicacion-card"
              style={{ border: '1px solid #ccc', borderRadius: '12px', padding: '1rem', background: '#fff' }}
            >
              <img
                src={publi.imagenes?.[0]?.url || 'https://via.placeholder.com/200'}
                alt={publi.titulo}
                style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '8px' }}
              />
              <h3>{publi.titulo}</h3>
              <p>{publi.descripcion}</p>
              <p><strong>Precio:</strong> ${publi.precio}</p>
              <p><strong>Ubicación:</strong> {publi.ubicacion}</p>

              <button onClick={() => navigate(`/editar-publicacion/${publi.id}`)} style={{ marginRight: '8px' }}>
                Editar
              </button>
              <button onClick={() => handleEliminar(publi.id)} style={{ backgroundColor: '#b30000', color: '#fff', border: 'none', borderRadius: '8px', padding: '6px 12px' }}>
                Eliminar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MisPublicaciones;
