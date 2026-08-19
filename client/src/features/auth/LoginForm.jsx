import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "./authSlice";

export default function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((s) => s.auth);

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser(form));
    if (loginUser.fulfilled.match(result)) navigate("/dashboard");
  };

  return (
    <div className="card">
      <h2>Sign in to MediTrack</h2>
      <form onSubmit={onSubmit}>
        <label>Email</label>
        <input name="email" value={form.email} onChange={onChange} />
        <label>Password</label>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={onChange}
        />
        {error && <p className="error">{error}</p>}
        <button disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
      <p className="muted">
        New patient? <Link to="/register">Create an account</Link>
      </p>
      <p className="muted">
        <Link to="/forgot">Forgot your password?</Link>
      </p>
    </div>
  );
}