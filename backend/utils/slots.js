// helper to generate slots for a given week (weekStartDate is a Date at 00:00 local or UTC).
// We'll create slots in UTC by using Date objects carefully

function startOfWeek(date) {
  // returns Monday of the week for the provided date (ISO week, Monday = 1)

  const d = new Date(date);
  const day = d.getUTCDay(); // 0=Sun ... 6=Sat (use UTC so it's consistent)
  // Calculate how many days to subtract to get to Monday
  const diff = day === 0 ? -6 : 1 - day; // if Sunday (0) → go back 6 days
  d.setUTCDate(d.getUTCDate() + diff);
  d.setUTCHours(0, 0, 0, 0);
  return d;
}

//  Generate slots for Monday–Friday, 9:00–16:30 IST (half-hour intervals).

//   Each slot's `start` is in UTC ISO so comparisons are consistent everywhere.

function generateWeekSlots(weekStartISO) {
  const base = weekStartISO ? new Date(weekStartISO) : new Date();
  const monday = startOfWeek(base); // local Monday 00:00
  const slots = [];
  for (let dayOffset = 0; dayOffset < 5; dayOffset++) {
    // Mon-Fri
    const day = new Date(monday);
    day.setUTCDate(monday.getUTCDate() + dayOffset);

    // YYYY-MM-DD part (in UTC) — okay because we later construct +05:30 time explicitly
    const dateStr = day.toISOString().split("T")[0];
    // IST working hours: 09:00–16:30

    for (let hour = 9; hour < 17; hour++) {
      for (let minute of [0, 30]) {
        const hh = hour.toString().padStart(2, "0");
        const mm = minute.toString().padStart(2, "0");

        // Build explicit IST ISO and convert to canonical UTC ISO
        const istIso = `${dateStr}T${hh}:${mm}:00+05:30`;
        const startUtcIso = new Date(istIso).toISOString();
        slots.push({
          start: startUtcIso,
          date: dateStr,
          time: `${hh}:${mm}`,
        });
      }
    }
  }
  return slots;
}

export { generateWeekSlots };
