import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/auth-context";

function PublicOnlyRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="auth-loading">Validando sesión...</div>;
  }

  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
}

export default PublicOnlyRoute;
