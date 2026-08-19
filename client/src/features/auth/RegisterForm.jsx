import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "./authSlice";

export default function RegisterForm() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((s) => s.auth);

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // TASK 5.5: this one is finished for you - read it, then write LoginForm the same way.
  const onSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) return alert("Minimum 6 characters");
    const result = await dispatch(registerUser(form));
    if (registerUser.fulfilled.match(result)) navigate("/dashboard");
  };

  return (
    <div className="card">
      <h2>Create your patient account</h2>
      <form onSubmit={onSubmit}>
        <label>Full name</label>
        <input name="name" value={form.name} onChange={onChange} />
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
          {loading ? "Creating..." : "Create account"}
        </button>
      </form>
      <p className="muted">
        Already registered? <Link to="/login">Sign in</Link>
      </p>
    </div>
  );
}
