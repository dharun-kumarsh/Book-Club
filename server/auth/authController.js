const { validationResult } = require("express-validator");
const authService = require("./authService");
const logger = require("../utils/logger");

exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, dateOfBirth } = req.body;
    const result = await authService.loginUser(email, dateOfBirth);
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

    const { username, email, dateOfBirth, role } = req.body;
    const result = await authService.registerUser(
      username,
      email,
      dateOfBirth,
      role
    );
    res.status(201).json(result);
  } catch (error) {
    logger.error(`Registration error: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
};
