/**
 * TASK 7.1 - Authorization, not authentication.
 */
function requireRole(...allowed) {
  return function (req, res, next) {
    if (!req.user) {
      return res.status(401).json({ msg: "Not authorised" });
    }

    if (!allowed.includes(req.user.role)) {
      return res.status(403).json({ msg: "Forbidden — insufficient role" });
    }

    next();
  };
}

module.exports = requireRole;