import express from "express";
import {
  bookedAppointments,
  availableAppointments,
  createAppointments,
  cancelAppoinment,
} from "../Controllers/appointmentsController.js";

const appoinmentRouter = express.Router();

// GET /api/appointments - all appointments
appoinmentRouter.get("/", bookedAppointments);

// GET /api/appointments/available?weekStart=2025-10-27T00:00:00.000Z
appoinmentRouter.get("/available", availableAppointments);

// POST /api/appointments
// Body: { startDateTime: ISOString, name, email, phone?, reason? }
appoinmentRouter.post("/", createAppointments);

// DELETE /api/appointments/:id
appoinmentRouter.delete("/:id", cancelAppoinment);

export default appoinmentRouter;
