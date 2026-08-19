const mongoose = require("mongoose");

/**
 * TASK 6.1 - An appointment always belongs to exactly one patient.
 *
 * Fields:
 *   doctor    -> String, required, trim
 *   reason    -> String, default ""
 *   scheduledFor -> Date, required
 *   status    -> String, enum ["requested", "confirmed", "cancelled"], default "requested"
 *   owner     -> ObjectId, ref "User", required, index: true
 *
 * The owner value must ALWAYS come from req.user.id, never from req.body.
 */
const appointmentSchema = new mongoose.Schema(
  {
    doctor: { type: String, required: true, trim: true },
    reason: { type: String, default: "" },
    scheduledFor: { type: Date, required: true },

    status: {
      type: String,
      enum: ["requested", "confirmed", "cancelled"],
      default: "requested",
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);