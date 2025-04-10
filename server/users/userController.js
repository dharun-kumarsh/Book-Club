const { validationResult } = require('express-validator');
const userService = require('./userService');
const logger = require('../utils/logger');

exports.getProfile = async (req, res) => {
  try {
    const user = await userService.getUserProfile(req.userId);
    res.status(200).json(user);
  } catch (error) {
    logger.error(`Get profile error: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email } = req.body;
    const updatedUser = await userService.updateUserProfile(req.userId, { username, email });
    res.status(200).json(updatedUser);
  } catch (error) {
    logger.error(`Update profile error: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    await userService.deleteUserProfile(req.userId);
    res.status(200).json({ message: 'Profile deleted successfully' });
  } catch (error) {
    logger.error(`Delete profile error: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
};