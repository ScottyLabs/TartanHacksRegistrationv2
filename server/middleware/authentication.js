const User = require("../models/User");

const authenticate = (req, res, next) => {
  const token = req.headers["x-access-token"];
  User.getByToken(token, (err, user) => {
    if (err) {
      return next(err);
    }
    if (user) {
      req.user = user;
      return next();
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  });
};

module.exports = authenticate;