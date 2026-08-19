import { useState } from "react";
import api from "../../api/axios";

// TASK 8.4 (BONUS) - public page, never behind ProtectedRoute.
export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const { data } = await api.post("/auth/forgot-password", { email });
    setMsg(data.msg);
  };

  return (
    <div className="card">
      <h2>Reset your password</h2>
      <form onSubmit={onSubmit}>
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
        <button>Send reset link</button>
      </form>
      {msg && <p className="muted">{msg}</p>}
      <p className="muted">
        In this exercise the link is printed to the server console instead of
        being emailed.
      </p>
    </div>
  );
}
