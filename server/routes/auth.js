const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const User = require("../models/User");
const protect = require("../middleware/auth");

const router = express.Router();

/**
 * TASK 3.1 - One cookieOptions object, reused by register, login AND logout.
 */
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "true",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
};

const signToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

// The response body carries the user only - never the token.
const publicUser = (u) => ({
  id: u._id,
  name: u.name,
  email: u.email,
  role: u.role,
});

/**
 * TASK 3.2 - POST /api/auth/register
 */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ msg: "Email already registered" });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });

    res
      .cookie("token", signToken(user), cookieOptions)
      .status(201)
      .json({ user: publicUser(user) });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

/**
 * TASK 3.3 - POST /api/auth/login
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    const ok = user && (await bcrypt.compare(password, user.password));

    if (!ok) return res.status(400).json({ msg: "Invalid credentials" });

    res
      .cookie("token", signToken(user), cookieOptions)
      .status(200)
      .json({ user: publicUser(user) });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

/**
 * TASK 4.2 - GET /api/auth/me   (protected)
 */
router.get("/me", protect, async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(401).json({ msg: "No user" });
  res.json({ user: publicUser(user) });
});

/**
 * TASK 4.3 - POST /api/auth/logout
 */
router.post("/logout", (req, res) => {
  res.clearCookie("token", cookieOptions);
  res.json({ msg: "Logged out" });
});

/**
 * TASK 8.2 (BONUS) - POST /api/auth/forgot-password
 * Abhi ke liye skip — baad mein Part 9 mein karenge.
 */
router.post("/forgot-password", async (req, res) => {
  const generic = { msg: "If that email exists, a reset link was sent" };
  // TODO (Task 8.2)
  res.json(generic);
});

/**
 * TASK 8.3 (BONUS) - POST /api/auth/reset-password/:raw
 * Abhi ke liye skip — baad mein Part 9 mein karenge.
 */
router.post("/reset-password/:raw", async (req, res) => {
  // TODO (Task 8.3)
  res.status(501).json({ msg: "Not implemented - Task 8.3" });
});

module.exports = router;