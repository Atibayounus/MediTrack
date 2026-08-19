const express = require("express");
const Appointment = require("../models/Appointment");
const protect = require("../middleware/auth");

const router = express.Router();

// TASK 6.2: guard every route in this file with one line.
router.use(protect);

/**
 * TASK 6.3 - GET /api/appointments
 * Return ONLY the appointments whose owner is req.user.id, newest first.
 */
router.get("/", async (req, res) => {
  const appointments = await Appointment.find({ owner: req.user.id }).sort({
    scheduledFor: 1,
  });
  res.json({ appointments });
});

/**
 * TASK 6.4 - POST /api/appointments
 * owner comes from the token (req.user.id), never from req.body.
 */
router.post("/", async (req, res) => {
  const appointment = await Appointment.create({
    doctor: req.body.doctor,
    reason: req.body.reason,
    scheduledFor: req.body.scheduledFor,
    owner: req.user.id,
  });
  res.status(201).json({ appointment });
});

/**
 * TASK 6.5 - PUT /api/appointments/:id
 */
router.put("/:id", async (req, res) => {
  const appointment = await Appointment.findOneAndUpdate(
    { _id: req.params.id, owner: req.user.id },
    { doctor: req.body.doctor, reason: req.body.reason },
    { new: true, runValidators: true }
  );
  if (!appointment) return res.status(404).json({ msg: "Not found" });
  res.json({ appointment });
});

/**
 * TASK 6.6 - DELETE /api/appointments/:id
 */
router.delete("/:id", async (req, res) => {
  const appointment = await Appointment.findOneAndDelete({
    _id: req.params.id,
    owner: req.user.id,
  });
  if (!appointment) return res.status(404).json({ msg: "Not found" });
  res.json({ msg: "Cancelled", id: req.params.id });
});

module.exports = router;