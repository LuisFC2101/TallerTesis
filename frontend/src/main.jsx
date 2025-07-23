import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from '@pages/Login';
import Home from '@pages/Home';
import Users from '@pages/Users';
import Register from '@pages/Register';
import Error404 from '@pages/Error404';
import Root from '@pages/Root';
import ProtectedRoute from '@components/ProtectedRoute';
import '@styles/styles.css';
import PublicacionDetalle from './pages/PublicacionDetalle';
import SeleccionRol from '@pages/SeleccionRol';
import RegisterEmprendedor from '@pages/RegisterEmprendedor';
import CrearPublicacion from '@pages/CrearPublicacion';
import MisPublicaciones from './pages/MisPublicaciones';
import EditarPublicacion from './pages/EditarPublicacion';

const router = createBrowserRouter([
{
  path: '/',
  element: <Root />, 
  errorElement: <Error404 />,
  children: [
    {
      index: true,
      element: <Home />
    },
    {
      path: 'home',
      element: <Home />
    },
    {
      path: 'users',
      element: (
        <ProtectedRoute allowedRoles={['administrador']}>
          <Users />
        </ProtectedRoute>
      )
    },
    {
  path: 'publicacion/:id',
  element: <PublicacionDetalle />
  },
  { 
    path: '/crear-publicacion',
    element: (
    <ProtectedRoute allowedRoles={['emprendedor']}>
      <CrearPublicacion />
    </ProtectedRoute>
  )
  },
  {
    path:'/mis-publicaciones',
    element: (
    <ProtectedRoute allowedRoles={['emprendedor']}>
      <MisPublicaciones />
    </ProtectedRoute>
    )
  },
  {
    path: '/editar-publicacion/:id',
    element: (
      <ProtectedRoute allowedRoles={['emprendedor']}>
        <EditarPublicacion />
      </ProtectedRoute>
    )
  }
  ]
},

  {
    path: '/auth',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/seleccion-rol',
    element: <SeleccionRol />
  },
  {
  path: '/register/emprendedor',
  element: <RegisterEmprendedor />
}

]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)