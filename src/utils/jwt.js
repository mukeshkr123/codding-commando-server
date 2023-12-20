require("dotenv").config();
const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_KEY, { expiresIn: "60m" });
};

module.exports = {
  generateToken,
};
