import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema(
  {
    startDateTime: {
      type: Date,
      required: true,
      index: true,
    }, // stored in UTC

    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    reason: {
      type: String,
      trim: true,
      maxlength: 200,
    },
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    // },
  },
  {
    timestamps: true,
  }
);

// AppointmentSchema.index({ startDateTime: 1 }, { unique: false });

const appointmentModel =
  mongoose.models.appointmentModel ||
  mongoose.model("Appointment", AppointmentSchema);

export default appointmentModel;
