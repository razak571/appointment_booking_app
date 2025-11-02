import { useState } from "react";
import { createAppointment } from "../api";

function BookingForm({ defaultStart, onDone, onCancel }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  async function submit(e) {
    e.preventDefault();
    setMessage(null);

    if (!name.trim() || !email.trim()) {
      setMessage({ type: "error", text: "Name and email are required" });
      return;
    }
    if (reason.length > 200) {
      setMessage({ type: "error", text: "Reason must be <= 200 chars" });
      return;
    }

    setLoading(true);
    try {
      await createAppointment({
        startDateTime: defaultStart,
        name,
        email,
        phone,
        reason,
      });

      setMessage({ type: "success", text: "Booked successfully" });
      setTimeout(() => {
        setLoading(false);
        onDone();
      }, 500);
    } catch (err) {
      setLoading(false);
      setMessage({ type: "error", text: err?.message || "Failed to book" });
    }
  }

  return (
    <div style={{ marginTop: 16, border: "1px solid #ccc", padding: 12 }}>
      {/* <h3>
        Book {defaultStart.date} {defaultStart.time}
      </h3> */}

      {/* <h3>Book {new Date(defaultStart).toLocaleString()}</h3> */}
      {/* <h3>
        Book{" "}
        {new Date(defaultStart).toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
      </h3> */}
      {/* <h3>
        Book{" "}
        {(() => {
          const d = new Date(defaultStart);
          // convert UTC → IST manually (add 5h 30m)
          const ist = new Date(d.getTime() + 5.5 * 60 * 60 * 1000);
          return ist.toLocaleString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });
        })()}
      </h3> */}

      <h3>
        Book{" "}
        {(() => {
          const d = new Date(defaultStart);
          const localOffset = d.getTimezoneOffset(); // in minutes
          // If system not in IST (offset != -330), adjust manually
          const adjusted =
            localOffset === -330
              ? d // already IST system
              : new Date(d.getTime() + 5.5 * 60 * 60 * 1000);
          return adjusted.toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });
        })()}
      </h3>

      <form onSubmit={submit}>
        <div>
          <label>Name*</label>
          <br />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email*</label>
          <br />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
        </div>
        <div>
          <label>Phone</label>
          <br />
          <input value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div>
          <label>Reason (max 200)</label>
          <br />
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            maxLength={200}
          />
        </div>
        <div style={{ marginTop: 8 }}>
          <button type="submit" disabled={loading}>
            Book
          </button>
          <button type="button" onClick={onCancel} style={{ marginLeft: 8 }}>
            Cancel
          </button>
        </div>
        {message && (
          <div
            style={{
              marginTop: 8,
              color: message.type === "error" ? "red" : "green",
            }}
          >
            {message.text}
          </div>
        )}
      </form>
    </div>
  );
}

export default BookingForm;
