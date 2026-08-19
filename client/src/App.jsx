import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import LoginForm from "./features/auth/LoginForm";
import RegisterForm from "./features/auth/RegisterForm";
import ForgotPassword from "./features/auth/ForgotPassword";
import ResetPassword from "./features/auth/ResetPassword";
import Dashboard from "./features/appointments/Dashboard";
import StaffPanel from "./features/appointments/StaffPanel";
import ProtectedRoute from "./routes/ProtectedRoute";
import RoleRoute from "./routes/RoleRoute";
import { fetchMe } from "./features/auth/authSlice";

export default function App() {
  const dispatch = useDispatch();
  const { booted } = useSelector((s) => s.auth);

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  if (!booted) return <p className="page">Starting MediTrack...</p>;

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/reset/:raw" element={<ResetPassword />} />
        <Route path="/forbidden" element={<p className="page">403 - you do not have access to this page.</p>} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route element={<RoleRoute allow={["staff"]} />}>
          <Route path="/staff" element={<StaffPanel />} />
        </Route>
      </Routes>
    </>
  );
}