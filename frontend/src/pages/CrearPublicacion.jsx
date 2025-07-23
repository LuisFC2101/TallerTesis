import { useEffect, useState } from 'react';
import FormCard from '../components/FormCard';
import crearPublicacion from '../services/Publicaciones/crearPublicacion';
import getCategorias from '../services/Categorias/getCategorias';
import getMisEmprendimientos from '../services/Emprendimientos/getMisEmprendimientos';
import Swal from 'sweetalert2';

const CrearPublicacion = () => {
  const [form, setForm] = useState({
    titulo: '',
    descripcion: '',
    precio: '',
    ubicacion: '',
    categoriaId: '',
    emprendimientoId: '',
    imagenes: ['']
  });

  const [categorias, setCategorias] = useState([]);
  const [emprendimientos, setEmprendimientos] = useState([]);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [cat, emp] = await Promise.all([
          getCategorias(),
          getMisEmprendimientos()
        ]);
        setCategorias(cat);
        setEmprendimientos(emp);
      } catch (error) {
        Swal.fire(Error, 'Error al cargar categorías o emprendimientos', error);
      }
    };
    cargarDatos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const datos = {
        ...form,
        precio: Number(form.precio),
        categoriaId: Number(form.categoriaId),
        emprendimientoId: Number(form.emprendimientoId),
        imagenes: [form.imagenes[0]]
      };
      await crearPublicacion(datos);
      Swal.fire('¡Publicación creada!', 'Tu publicación fue registrada con éxito.', 'success');
      setForm({
        titulo: '',
        descripcion: '',
        precio: '',
        ubicacion: '',
        categoriaId: '',
        emprendimientoId: '',
        imagenes: ['']
      });
    } catch (error) {
      Swal.fire('Error', error.toString(), 'error');
    }
  };

  return (
    <FormCard title="Crear Nueva Publicación" onSubmit={handleSubmit}>
      <input name="titulo" placeholder="Título" value={form.titulo} onChange={handleChange} />
      <textarea name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} />
      <input type="number" name="precio" placeholder="Precio" value={form.precio} onChange={handleChange} />
      <input name="ubicacion" placeholder="Ubicación" value={form.ubicacion} onChange={handleChange} />

      <select name="categoriaId" value={form.categoriaId} onChange={handleChange}>
        <option value="">Selecciona una categoría</option>
        {categorias.map((cat) => (
          <option key={cat.id} value={cat.id}>{cat.nombre}</option>
        ))}
      </select>

      <select name="emprendimientoId" value={form.emprendimientoId} onChange={handleChange}>
        <option value="">Selecciona tu emprendimiento</option>
        {emprendimientos.map((emp) => (
          <option key={emp.id} value={emp.id}>{emp.nombre}</option>
        ))}
      </select>

      <input
        name="imagenes"
        placeholder="URL Imagen"
        value={form.imagenes[0]}
        onChange={(e) => setForm({ ...form, imagenes: [e.target.value] })}
      />
    </FormCard>
  );
};

export default CrearPublicacion;
