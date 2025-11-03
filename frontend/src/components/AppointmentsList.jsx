import { useEffect, useState } from "react";
import { getAppointments, deleteAppointment } from "../api";

export default function AppointmentsList({ refreshFlag, setRefreshFlag }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    load();
  }, [refreshFlag]);

  async function load() {
    const res = await getAppointments();
    if (res.success) setItems(res.data);
  }

  async function cancel(id) {
    if (!window.confirm("Cancel this appointment?")) return;
    await deleteAppointment(id);
    load();
    setRefreshFlag((p) => p + 1);
  }

  return (
    <div style={{ marginTop: 20 }}>
      <h3>All Appointments</h3>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Date & Time</th>
            <th>Name</th>
            <th>Reason</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((a) => (
            <tr key={a._id}>
              <td>
                {new Date(a.startDateTime).toLocaleString("en-IN", {
                  timeZone: "Asia/Kolkata",
                })}
              </td>
              <td>{a.name}</td>
              <td>{a.reason || "-"}</td>
              <td>
                <button onClick={() => cancel(a._id)}>Cancel</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
