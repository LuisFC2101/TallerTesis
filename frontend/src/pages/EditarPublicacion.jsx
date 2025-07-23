import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import getPublicacionById from '../services/Publicaciones/getPublicacionesById';
import updatePublicacion from '../services/Publicaciones/updatePublicacion';
import Swal from 'sweetalert2';
import FormCard from '../components/FormCard';

const EditarPublicacion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await getPublicacionById(id);
        setForm({
          titulo: data.titulo,
          descripcion: data.descripcion,
          precio: data.precio,
          ubicacion: data.ubicacion,
          imagenes: [data.imagenes?.[0]?.url || '']
        });
      } catch (error) {
        Swal.fire(Error, 'No se pudo cargar la publicación', error);
      }
    };
    cargar();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const datos = {
        titulo: form.titulo,
        descripcion: form.descripcion,
        precio: Number(form.precio),
        imagenes: [form.imagenes[0]]
      };
      await updatePublicacion(id, datos);
      Swal.fire('Actualizado', 'Publicación actualizada con éxito', 'success');
      navigate('/mis-publicaciones');
    } catch (error) {
      Swal.fire(Error, error.toString(), error);
    }
  };

  if (!form) return <p>Cargando...</p>;

  return (
    <FormCard title="Editar Publicación" onSubmit={handleSubmit}>
      <input name="titulo" value={form.titulo} onChange={handleChange} placeholder="Título" />
      <textarea name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Descripción" />
      <input type="number" name="precio" value={form.precio} onChange={handleChange} placeholder="Precio" />
      <input name="ubicacion" value={form.ubicacion} onChange={handleChange} placeholder="Ubicación" />
      <input name="imagenes" value={form.imagenes[0]} onChange={(e) => setForm({ ...form, imagenes: [e.target.value] })} placeholder="URL Imagen" />
    </FormCard>
  );
};

export default EditarPublicacion;
