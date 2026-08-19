import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const { isAuthenticated, booted } = useSelector((s) => s.auth);
  if (!booted) return <p>Loading session...</p>;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}