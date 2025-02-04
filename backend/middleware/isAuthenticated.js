const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../model/userModel");

const isAuthenticated = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({
      message: "Please login first to get token",
    });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decodedToken = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET
    );
    const userExists = await User.findOne({ _id: decodedToken.id });
    if (!userExists) {
      return res.status(400).json({
        message: "User with that token/id does not exist",
      });
    }

    req.user = userExists;
    next();
  } catch (error) {
    return res.status(403).json({
      message: error.message,
    });
  }
};

module.exports = isAuthenticated;
