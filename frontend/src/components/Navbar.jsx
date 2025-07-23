import { NavLink, useNavigate } from "react-router-dom";
import { logout } from '@services/auth.service.js';
import '@styles/navbar.css';
import { useState, useEffect } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const usuario = sessionStorage.getItem('usuario');
    setUser(usuario ? JSON.parse(usuario) : null);
  }, []);

  const handleLogout = () => {
    logout();
    sessionStorage.removeItem("usuario");
    navigate("/auth");
    setUser(null);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <NavLink to="/home" className="navbar-brand">
          PewmaTur
        </NavLink>
      </div>

      <ul className="nav-menu">
        <li><NavLink to="/home">Inicio</NavLink></li>

        {!user && (
          <>
            <li><NavLink to="/auth">Iniciar sesión</NavLink></li>
            <li><NavLink to="/seleccion-rol">Registrarse</NavLink></li>
          </>
        )}

        {user?.rol === 'administrador' && (
          <li><NavLink to="/users">Usuarios</NavLink></li>
        )}

        {user?.rol === 'emprendedor' && (
         <li>
          <NavLink to="/crear-publicacion">Crear publicación</NavLink>
        </li>
        )}
        {user?.rol === 'emprendedor' && (
            <li>
            <NavLink to="/mis-publicaciones">Mis publicaciones</NavLink>
            </li>
        )}



        {user && (
          <li>
            <button className="logout-btn" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
