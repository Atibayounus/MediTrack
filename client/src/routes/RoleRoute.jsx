import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function RoleRoute({ allow }) {
  const { user, isAuthenticated, booted } = useSelector((s) => s.auth);
  if (!booted) return <p>Loading session...</p>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return allow.includes(user.role) ? <Outlet /> : <Navigate to="/forbidden" replace />;
}