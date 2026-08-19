const jwt = require("jsonwebtoken");

/**
 * TASK 4.1 - The guard that stands in front of every private route.
 */
function protect(req, res, next) {
  let token = req.cookies.token; // 1. browser cookie se

  // TASK 4.4 - agar cookie nahi mili to Bearer header check karo  
  const header = req.headers["authorization"];
  if (!token && header && header.startsWith("Bearer ")) {
    token = header.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ msg: "Not authorised — no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, role: decoded.role };
    next(); // route tak jane do
  } catch (err) {
    res.status(401).json({ msg: "Token invalid or expired" });
  }
}

module.exports = protect;