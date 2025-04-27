const User = require("../users/userModel");
const generateToken = require("../utils/generateToken");
const logger = require("../utils/logger");

exports.loginUser = async (email, dateOfBirth) => {
  const user = await User.findOne({ where: { email, dateOfBirth } });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken(user.id);
  return {
    message: "Login successful",
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      dateOfBirth: user.dateOfBirth,
    },
  };
};

exports.registerUser = async (username, email, dateOfBirth, role = "user") => {
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  const user = await User.create({
    username,
    email,
    dateOfBirth,
    role,
  });

  const token = generateToken(user.id);
  return {
    message: "Registration successful",
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      dateOfBirth: user.dateOfBirth,
    },
  };
};
