const { validationResult } = require('express-validator');
const authService = require('./authService');
const logger = require('../utils/logger');

exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const result = await authService.loginUser(email, password);
    res.status(200).json(result);
  } catch (error) {
    logger.error(`Login error: ${error.message}`);
    res.status(401).json({ message: error.message });
  }
};

exports.register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;
    const result = await authService.registerUser(username, email, password);
    res.status(201).json(result);
  } catch (error) {
    logger.error(`Registration error: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    await authService.forgotPassword(email);
    res.status(200).json({ message: 'Password reset instructions sent to email' });
  } catch (error) {
    logger.error(`Forgot password error: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    await authService.resetPassword(token, newPassword);
    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    logger.error(`Reset password error: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
};