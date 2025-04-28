// const { validationResult } = require("express-validator");
// const authService = require("./authService");
// const logger = require("../utils/logger");
import { validationResult } from "express-validator";
import * as authService from "./authService";
import logger from "../utils/logger";

exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Check if admin login (email provided) or user login (registrationNumber provided)
    const isAdminLogin =
      req.body.email && req.body.email.endsWith("@msec.edu.in");

    if (isAdminLogin) {
      const { email } = req.body;
      const result = await authService.loginAdmin(email);
      res.status(200).json(result);
    } else {
      const { registrationNumber, dateOfBirth } = req.body;
      const result = await authService.loginUser(
        registrationNumber,
        dateOfBirth
      );
      res.status(200).json(result);
    }
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

    // Check if admin registration (email provided) or user registration (registrationNumber provided)
    const isAdminRegistration =
      req.body.email && req.body.email.endsWith("@msec.edu.in");

    if (isAdminRegistration) {
      const { email, name, dateOfBirth } = req.body;
      const result = await authService.registerAdmin(email, name, dateOfBirth);
      res.status(201).json(result);
    } else {
      const { registrationNumber, name, dateOfBirth } = req.body;
      const result = await authService.registerUser(
        registrationNumber,
        name,
        dateOfBirth
      );
      res.status(201).json(result);
    }
  } catch (error) {
    logger.error(`Registration error: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
};
