const baseURL = import.meta.env.VITE_BACKEND_BASE_URL;

async function getAvailable(weekStart) {
  const q = weekStart ? `?weekStart=${encodeURIComponent(weekStart)}` : "";
  const res = await fetch(`${baseURL}/appointments/available${q}`);
  return res.json();
}

async function getAppointments() {
  const res = await fetch(`${baseURL}/appointments`);
  return res.json();
}

async function createAppointment(payload) {
  const res = await fetch(`${baseURL}/appointments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}

async function deleteAppointment(id) {
  const res = await fetch(`${baseURL}/appointments/${id}`, {
    method: "DELETE",
  });
  return res.json();
}

export { getAvailable, getAppointments, createAppointment, deleteAppointment };
