import appointmentModel from "../Models/appointmentModel.js";
import { generateWeekSlots } from "../utils/slots.js";

// Basic email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// GET /api/appointments - all appointments
const bookedAppointments = async (req, res) => {
  try {
    const appts = await appointmentModel
      .find()
      .sort({ startDateTime: 1 })
      .lean();
    res.json({ success: true, data: appts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET /api/appointments/available?weekStart=2025-10-27T00:00:00.000Z
const availableAppointments = async (req, res) => {
  try {
    const weekStart = req.query.weekStart; // optional ISO
    const slots = generateWeekSlots(weekStart);

    // fetch appointments in that week range to mark booked
    const startISO = new Date(slots[0].start).toISOString();
    const endISO = new Date(slots[slots.length - 1].start);
    endISO.setMinutes(endISO.getMinutes() + 30); // end after last slot
    const appts = await appointmentModel
      .find({
        startDateTime: { $gte: new Date(startISO), $lt: endISO },
      })
      .lean();

    // Helper to convert any Date → "YYYY-MM-DD HH:MM" in IST (so local vs UTC won't matter)
    function toISTKey(date) {
      const d = new Date(date);

      const ist = new Date(d.getTime() + 5.5 * 60 * 60 * 1000); // convert UTC→IST

      return ist.toISOString().slice(0, 16); // up to minutes
    }

    const bookedSet = new Set(appts.map((a) => toISTKey(a.startDateTime)));

    const annotated = slots.map((s) => {
      const key = toISTKey(s.start);

      return { ...s, available: !bookedSet.has(key) };
    });

    res.json({ success: true, data: annotated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// POST /api/appointments
// Body: { startDateTime: ISOString, name, email, phone?, reason? }
const createAppointments = async (req, res) => {
  try {
    const { startDateTime, name, email, phone, reason } = req.body;
    if (!startDateTime || !name || !email) {
      return res.status(400).json({
        success: false,
        message: "startDateTime, name and email are required",
      });
    }
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }
    if (reason && reason.length > 200) {
      return res
        .status(400)
        .json({ success: false, message: "Reason must be <= 200 characters" });
    }

    const start = new Date(startDateTime);

    if (isNaN(start.getTime())) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid startDateTime" });
    }

    const now = new Date();
    //past slot validation
    if (start.getTime() <= now.getTime()) {
      return res
        .status(400)
        .json({ success: false, message: "Cannot book past slots" });
    }

    const day = start.getDay(); // 0 Sun .. 6 Sat
    if (day === 0 || day === 6) {
      return res
        .status(400)
        .json({ success: false, message: "Bookings allowed only Mon-Fri" });
    }
    // convert all checks in UTC (Render runs in UTC)
    const hour = start.getUTCHours();
    const minute = start.getUTCMinutes();
    if (
      hour < 3 ||
      hour > 11 ||
      (hour === 3 && minute < 30) ||
      (hour === 11 && minute > 0) ||
      (minute !== 0 && minute !== 30)
    ) {
      return res.status(400).json({
        success: false,
        message: "Outside business hours or invalid slot",
      });
    }

    // Prevent double booking: check if any appointment exists at same startDateTime
    const exists = await appointmentModel.findOne({ startDateTime: start });
    if (exists) {
      return res
        .status(409)
        .json({ success: false, message: "Slot already booked" });
    }

    const appt = new appointmentModel({
      startDateTime: start,
      name: name.trim(),
      email: email.trim(),
      phone: phone ? phone.trim() : undefined,
      reason: reason ? reason.trim() : undefined,
    });

    await appt.save();
    res.status(201).json({ success: true, data: appt });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// DELETE /api/appointments/:id
const cancelAppoinment = async (req, res) => {
  try {
    const id = req.params.id;
    const appt = await appointmentModel.findById(id);
    if (!appt)
      return res.status(404).json({ success: false, message: "Not found" });

    await appointmentModel.deleteOne({ _id: id });
    res.json({ success: true, message: "Cancelled" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export {
  bookedAppointments,
  availableAppointments,
  createAppointments,
  cancelAppoinment,
};
