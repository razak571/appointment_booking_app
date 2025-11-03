import { useEffect, useState } from "react";
import { getAvailable } from "../api";
import BookingForm from "./BookingForm";

function CalendarWeek({ refreshFlag, setRefreshFlag }) {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    load();
  }, [refreshFlag]);

  async function load() {
    setLoading(true);
    const res = await getAvailable();
    if (res.success) setSlots(res.data);
    setLoading(false);
  }

  const grouped = {};
  slots.forEach((s) => {
    if (!grouped[s.date]) grouped[s.date] = [];
    grouped[s.date].push(s);
  });

  return (
    <div>
      <h2>Week view (Mon–Fri)</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div style={{ display: "flex", gap: 12 }}>
          {Object.keys(grouped).map((date) => (
            <div
              key={date}
              style={{ border: "1px solid #ddd", padding: 8, minWidth: 140 }}
            >
              <h4>{date}</h4>
              {grouped[date].map((s) => (
                <div key={`${s.date}-${s.time}`} style={{ marginBottom: 6 }}>
                  <button
                    disabled={!s.available}
                    onClick={() =>
                      setSelectedSlot({
                        iso: s.start, // original ISO from backend (for reference if needed)
                        date: s.date, // YYYY-MM-DD (backend supplied)
                        time: s.time, // "HH:MM" (backend supplied)
                      })
                    }
                    style={{
                      width: "100%",
                      padding: 6,
                      background: s.available ? "#e6ffee" : "#ffe6e6",
                      cursor: s.available ? "pointer" : "not-allowed",
                      border: "1px solid #ccc",
                    }}
                  >
                    {s.time} {s.available ? "" : " — Booked"}
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {selectedSlot && (
        <BookingForm
          defaultStart={selectedSlot}
          onDone={async () => {
            setSelectedSlot(null);
            await new Promise((r) => setTimeout(r, 300)); // slight delay for DB update to reflect
            load();
            setRefreshFlag((p) => p + 1);
          }}
          onCancel={() => setSelectedSlot(null)}
        />
      )}
    </div>
  );
}

export default CalendarWeek;
