import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";

// TASK 8.5 (BONUS) - the raw token arrives in the URL: /reset/:raw
export default function ResetPassword() {
  const { raw } = useParams();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    // TODO (Task 8.5): refuse to submit unless password === confirm,
    // then POST /auth/reset-password/${raw} and navigate("/login") on success.
  };

  return (
    <div className="card">
      <h2>Choose a new password</h2>
      <form onSubmit={onSubmit}>
        <label>New password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Confirm password</label>
        <input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
        {msg && <p className="error">{msg}</p>}
        <button>Set new password</button>
      </form>
    </div>
  );
}
