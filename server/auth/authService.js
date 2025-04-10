const User = require('../users/userModel');
const generateToken = require('../utils/generateToken');
const logger = require('../utils/logger');

exports.loginUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isValidPassword = await user.comparePassword(password);
  if (!isValidPassword) {
    throw new Error('Invalid credentials');
  }

  const token = generateToken(user.id);
  return {
    message: 'Login successful',
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role
    }
  };
};

exports.registerUser = async (username, email, password) => {
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const user = await User.create({
    username,
    email,
    password
  });

  const token = generateToken(user.id);
  return {
    message: 'Registration successful',
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role
    }
  };
};

exports.forgotPassword = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error('User not found');
  }
  // Implement password reset email logic here
  logger.info(`Password reset requested for user: ${email}`);
};

exports.resetPassword = async (token, newPassword) => {
  // Implement password reset logic here
  logger.info('Password reset attempted');
};