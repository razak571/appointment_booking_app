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

    const bookedSet = new Set(
      appts.map((a) => new Date(a.startDateTime).toISOString())
    );

    const annotated = slots.map((s) => ({
      ...s,
      available: !bookedSet.has(new Date(s.start).toISOString()),
    }));

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

    // const start = new Date(
    //   `${startDateTime.date}T${startDateTime.time}:00+05:30`
    // ); // reconstrcting ISO string manually

    // 2025-11-03T09:00:00Z  =>  2025-11-03T03:30:00Z

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
    const hour = start.getHours();
    const minute = start.getMinutes();
    if (
      hour < 9 ||
      hour > 16 ||
      (hour === 16 && minute > 30) ||
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
