// helper to generate slots for a given week (weekStartDate is a Date at 00:00 local or UTC).
// We'll create slots in UTC by using Date objects carefully

function startOfWeek(date) {
  // returns Monday of the week for the provided date (ISO week, Monday = 1)
  const d = new Date(date);
  const day = d.getDay(); // 0 Sun .. 6 Sat
  const diffToMonday = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diffToMonday);
  d.setHours(0, 0, 0, 0);
  return d;
}

function addMinutes(d, mins) {
  return new Date(d.getTime() + mins * 60000);
}

/**
 * generateWeekSlots(weekStartDate?: ISO string) -> returns array of slot objects
 * Each slot: { start: ISOString, date: 'YYYY-MM-DD', time: 'HH:MM' }
 * Defaults to current week (Mon).
 */
function generateWeekSlots(weekStartISO) {
  const base = weekStartISO ? new Date(weekStartISO) : new Date();
  const monday = startOfWeek(base); // local Monday 00:00
  const slots = [];
  for (let dayOffset = 0; dayOffset < 5; dayOffset++) {
    // Mon-Fri
    const day = new Date(monday);
    day.setDate(monday.getDate() + dayOffset);
    // business hours 9:00 - 17:00 (last slot start 16:30)
    for (let hour = 9; hour < 17; hour++) {
      for (let minute of [0, 30]) {
        const s = new Date(day);
        s.setHours(hour, minute, 0, 0);
        // push ISO
        slots.push({
          start: s.toISOString(),
          date: s.toISOString().split("T")[0],
          time: s.toTimeString().slice(0, 5),
        });
      }
    }
  }
  return slots;
}

export { generateWeekSlots, startOfWeek, addMinutes };
