const User = require("../models/User");

const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(500).json({ message: "Internal server error" });
  }
  if (!req.user?.admin) {
    return res.status(403).json({ message: "Forbidden" });
  }
  return next();
}

const isOwnerOrAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(500).json({ message: "Internal server error" });
  }
  if (req.user?.admin) {
    return next();
  }
  const id = req.params.id;
  if (id != req.user._id) {
    return res.status(401).json({ message: "Token does not match id" });
  }
  return next();
}

module.exports = {
  isAdmin, isOwnerOrAdmin
}