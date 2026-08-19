import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";

export default function Navbar() {
  const { isAuthenticated, user } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <nav className="nav">
      <Link className="brand" to="/">MediTrack</Link>
      <div className="spacer" />
      {isAuthenticated ? (
        <>
          <Link to="/dashboard">My appointments</Link>
          {user?.role === "staff" && <Link to="/staff">Clinic schedule</Link>}
          <button onClick={handleLogout}>Log out</button>
        </>
      ) : (
        <>
          <Link to="/login">Sign in</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}