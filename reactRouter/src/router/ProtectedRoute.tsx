import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

function ProtectedRoute() {
	// Obtenemos el valor de isAuthenticated 
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    // Si no está autenticado, redirige al login
    return <Navigate to="/signIn" replace />;
  }

  // Si está autenticado, renderiza el contenido protegido
  return <Outlet />;
}

export default ProtectedRoute;