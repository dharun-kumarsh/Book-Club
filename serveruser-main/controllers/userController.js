const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const generateToken = require('../utils/generateToken');
const logger = require('../utils/logger');

// User Registration
exports.registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'User with this email already exists' });
    }

    const newUser = await User.create({ username, email, password });

    logger.info(`User registered: ${newUser.email}`);
    const token = generateToken(newUser.id);
    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    logger.error(`Error registering user: ${error.message}`);
    res.status(500).json({ message: 'Something went wrong during registration' });
  }
};

// User Login
exports.loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    logger.info(`User logged in: ${user.email}`);
    const token = generateToken(user.id);
    res.status(200).json({ message: 'Logged in successfully', token });
  } catch (error) {
    logger.error(`Error logging in user: ${error.message}`);
    res.status(500).json({ message: 'Something went wrong during login' });
  }
};

// Get User Profile (requires authentication)
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId, {
      attributes: ['id', 'username', 'email'], // Exclude sensitive data like password
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    logger.error(`Error fetching profile for user ID ${req.userId}: ${error.message}`);
    res.status(500).json({ message: 'Something went wrong while fetching profile' });
  }
};

// Update User Profile (requires authentication)
exports.updateProfile = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email } = req.body;

    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the new email is already taken by another user
    if (email && email !== user.email) {
      const existingUserWithEmail = await User.findOne({ where: { email } });
      if (existingUserWithEmail && existingUserWithEmail.id !== user.id) {
        return res.status(409).json({ message: 'Email already taken by another user' });
      }
    }

    await user.update({ username, email });

    logger.info(`Profile updated for user ID ${req.userId}`);
    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    logger.error(`Error updating profile for user ID ${req.userId}: ${error.message}`);
    res.status(500).json({ message: 'Something went wrong while updating profile' });
  }
};

// Password Reset (Implementation can vary based on requirements - this is a basic structure)
exports.requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User with this email not found' });
    }

    // In a real application, you would:
    // 1. Generate a unique reset token
    // 2. Store the token and its expiry in the database (associated with the user)
    // 3. Send an email to the user with a link containing the reset token

    logger.info(`Password reset requested for user: ${user.email}`);
    res.status(200).json({ message: 'Password reset link sent to your email (if account exists)' });
  } catch (error) {
    logger.error(`Error requesting password reset: ${error.message}`);
    res.status(500).json({ message: 'Something went wrong while processing password reset request' });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { token, newPassword } = req.body;

    // In a real application, you would:
    // 1. Verify the reset token against the one stored in the database
    // 2. Check if the token has expired
    // 3. Find the user associated with the token
    // 4. Update the user's password with the new password (after hashing)
    // 5. Invalidate or remove the reset token

    // For now, a simplified response:
    logger.info(`Password reset initiated with token: ${token}`);
    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    logger.error(`Error resetting password: ${error.message}`);
    res.status(500).json({ message: 'Something went wrong while resetting password' });
  }
};