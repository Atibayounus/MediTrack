const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

/**
 * TASK 1.4 - Middleware order matters. Everything below must be registered
 * ABOVE the routes, or req.body / req.cookies will be undefined.
 *
 *   app.use(express.json());       // fills req.body
 *   app.use(cookieParser());       // fills req.cookies
 *   app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
 *
 * origin must be the exact Vite URL. "*" silently kills cookies.
 */
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// TASK 9 (BONUS) - hardening
// TODO (Task 9.1): app.use(helmet());
// TODO (Task 9.2): rate-limit /api/auth with express-rate-limit
// TODO (Task 9.3): app.use(mongoSanitize()) to block NoSQL injection

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/appointments", require("./routes/appointments"));
app.use("/api/staff", require("./routes/staff"));

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection failed:", err.message));
  module.exports = app;