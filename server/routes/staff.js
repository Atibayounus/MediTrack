const express = require("express");
const Appointment = require("../models/Appointment");
const User = require("../models/User");
const protect = require("../middleware/auth");
const requireRole = require("../middleware/requireRole");

const router = express.Router();

/**
 * TASK 7.2 - GET /api/staff/appointments
 * Staff members see EVERY appointment in the clinic, with the patient's name.
 * Order matters: protect first (who are you?), then requireRole (may you?).
 */
router.get(
  "/appointments",
  protect,
  requireRole("staff"),
  async (req, res) => {
    const appointments = await Appointment.find()
      .populate("owner", "name email")
      .sort({ scheduledFor: 1 });
    res.json({ appointments });
  }
);

/**
 * TASK 7.3 - PATCH /api/staff/appointments/:id/status
 * Staff may confirm or cancel ANY appointment - no owner filter here,
 * because the role itself is the permission.
 */
router.patch(
  "/appointments/:id/status",
  protect,
  requireRole("staff"),
  async (req, res) => {
    const { status } = req.body;
    if (!["confirmed", "cancelled"].includes(status))
      return res.status(400).json({ msg: "Invalid status" });

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json({ appointment });
  }
);

module.exports = router;