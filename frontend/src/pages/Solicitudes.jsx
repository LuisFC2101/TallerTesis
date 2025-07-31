import { useEffect, useState } from "react";
import axios from "@services/root.service";
import "@styles/solicitudes.css"; 

const Solicitudes = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar solicitudes
  useEffect(() => {
    const fetchSolicitudes = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/solicitudes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Respuesta del servidor:", response.data);

        if (Array.isArray(response.data.data)) {
          setSolicitudes(response.data.data);
        } else {
          setError("Formato inesperado en la respuesta del servidor.");
        }
      } catch (error) {
        console.error("Error al cargar solicitudes:", error);
        setError("Ocurrió un error al obtener las solicitudes.");
      } finally {
        setLoading(false);
      }
    };

    fetchSolicitudes();
  }, []);

  // para la aprobar solicitud
  const aprobarSolicitud = async (id) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(`/solicitudes/${id}/aceptar`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    if (response.status === 200 || response.status === 201) {
      // para eliminar la tarjeta al aprobar correctamente
      setSolicitudes((prev) => prev.filter((s) => s.id !== id));
    } else {
      throw new Error("Error inesperado");
    }
  } catch (error) {
    console.error("Error al aprobar la solicitud:", error);
    console.log("Detalle:", error?.response?.data);
    alert("No se pudo aprobar la solicitud.");
  }
};


  return (
    <div className="solicitudes-container">
      <h1>Solicitudes pendientes</h1>

      {loading ? (
        <p>Cargando solicitudes...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : solicitudes.length === 0 ? (
        <p>No hay solicitudes pendientes.</p>
      ) : (
        <div className="tarjetas-solicitudes">
          {solicitudes.map((s) => (
            <div key={s.id} className="tarjeta-solicitud">
              <h3>{s.nombre}</h3>
              <p><strong>Email:</strong> {s.email}</p>
              <p><strong>Emprendimiento:</strong> {s.nombreEmprendimiento}</p>
              <p><strong>Motivo:</strong> {s.motivo}</p>
              <div className="acciones">
                <button className="btn-aprobar" onClick={() => aprobarSolicitud(s.id)}>Aprobar</button>
                <button className="btn-rechazar">Rechazar</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Solicitudes;
