import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function StaffPanel() {
  const [rows, setRows] = useState([]);

  const load = async () => {
    const { data } = await api.get("/staff/appointments");
    setRows(data.appointments);
  };

  useEffect(() => {
    load();
  }, []);

  const setStatus = async (id, status) => {
    await api.patch(`/staff/appointments/${id}/status`, { status });
    load();
  };

  return (
    <div className="page">
      <h2>Clinic schedule (staff only)</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Patient</th>
            <th>Doctor</th>
            <th>When</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((a) => (
            <tr key={a._id}>
              <td>{a.owner?.name}</td>
              <td>{a.doctor}</td>
              <td>{new Date(a.scheduledFor).toLocaleString()}</td>
              <td>
                <span className={`badge ${a.status}`}>{a.status}</span>
              </td>
              <td>
                <button onClick={() => setStatus(a._id, "confirmed")}>
                  Confirm
                </button>
                <button onClick={() => setStatus(a._id, "cancelled")}>
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}