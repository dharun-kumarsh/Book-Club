const User = require("../users/userModel");
const generateToken = require("../utils/generateToken");
const logger = require("../utils/logger");

exports.loginUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isValidPassword = await user.comparePassword(password);
  if (!isValidPassword) {
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

exports.registerUser = async (username, email, password, dateOfBirth) => {
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const user = await User.create({
    username,
    email,
    password,
    dateOfBirth,
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
