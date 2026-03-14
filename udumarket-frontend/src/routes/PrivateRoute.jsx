/*
PrivateRoute.jsx

Este componente protege rutas privadas.

Funcionamiento:
1) verifica si existe token en localStorage
2) si existe → permite acceso
3) si no existe → redirige a login
*/

import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {

  const token = localStorage.getItem("token");

  // si no hay token → login
  if (!token) {
    return <Navigate to="/" />;
  }

  // si hay token → renderiza la página
  return children;

}