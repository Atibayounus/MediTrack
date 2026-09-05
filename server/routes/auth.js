
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const User = require("../models/User");
const protect = require("../middleware/auth");

const router = express.Router();

/**
 * Cookie options
 * Reused by register, login AND logout.
 *
 * Production:
 * Frontend and backend are on different Vercel domains,
 * so SameSite must be "none" and Secure must be true.
 */
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

const signToken = (user) =>
  jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

// The response body carries the user only - never the token.
const publicUser = (u) => ({
  id: u._id,
  name: u.name,
  email: u.email,
  role: u.role,
});

/**
 * POST /api/auth/register
 */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        msg: "Name, email and password are required",
      });
    }

    const existing = await User.findOne({ email });

    if (existing) {
      return res.status(400).json({
        msg: "Email already registered",
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hash,
    });

    res
      .cookie("token", signToken(user), cookieOptions)
      .status(201)
      .json({
        user: publicUser(user),
      });
  } catch (err) {
    console.error("Register error:", err);

    res.status(500).json({
      msg: err.message,
    });
  }
});

/**
 * POST /api/auth/login
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        msg: "Email and password are required",
      });
    }

    const user = await User.findOne({ email }).select("+password");

    const ok =
      user && (await bcrypt.compare(password, user.password));

    if (!ok) {
      return res.status(400).json({
        msg: "Invalid credentials",
      });
    }

    res
      .cookie("token", signToken(user), cookieOptions)
      .status(200)
      .json({
        user: publicUser(user),
      });
  } catch (err) {
    console.error("Login error:", err);

    res.status(500).json({
      msg: err.message,
    });
  }
});

/**
 * GET /api/auth/me
 * Protected route
 */
router.get("/me", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(401).json({
        msg: "No user",
      });
    }

    res.json({
      user: publicUser(user),
    });
  } catch (err) {
    console.error("Get user error:", err);

    res.status(500).json({
      msg: err.message,
    });
  }
});

/**
 * POST /api/auth/logout
 */
router.post("/logout", (req, res) => {
  res.clearCookie("token", cookieOptions);

  res.json({
    msg: "Logged out",
  });
});

/**
 * POST /api/auth/forgot-password
 */
router.post("/forgot-password", async (req, res) => {
  const generic = {
    msg: "If that email exists, a reset link was sent",
  };

  // TODO: Task 8.2

  res.json(generic);
});

/**
 * POST /api/auth/reset-password/:raw
 */
router.post("/reset-password/:raw", async (req, res) => {
  // TODO: Task 8.3

  res.status(501).json({
    msg: "Not implemented - Task 8.3",
  });
});

module.exports = router;

