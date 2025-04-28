// const { body, oneOf, check } = require("express-validator");
import { body, oneOf, check } from "express-validator";
const registerValidationRules = () => [
  // Common validation for all registrations
  body("dateOfBirth")
    .optional({ checkFalsy: true })
    .isISO8601()
    .withMessage("Date of birth must be a valid date (YYYY-MM-DD)"),

  body("name")
    .optional()
    .trim()
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),

  // Conditional validation based on whether it's an admin or user registration
  oneOf(
    [
      [
        // Admin validation
        body("email")
          .exists()
          .isEmail()
          .normalizeEmail()
          .withMessage("Must be a valid email address")
          .matches(/@msec\.edu\.in$/)
          .withMessage("Admin email must end with @msec.edu.in"),
      ],
      [
        // User validation
        body("registrationNumber")
          .exists()
          .matches(/^3115\d{2}\d{3}\d{3}$/)
          .withMessage("Registration number must be in format 3115YYDDD###"),

        body("name").exists().withMessage("Name is required for users"),

        body("dateOfBirth")
          .exists()
          .withMessage("Date of birth is required for users"),
      ],
    ],
    "Either valid admin email or user registration details must be provided"
  ),
];

const loginValidationRules = () => [
  // Conditional validation based on whether it's an admin or user login
  oneOf(
    [
      [
        // Admin validation
        body("email")
          .exists()
          .isEmail()
          .normalizeEmail()
          .withMessage("Must be a valid email address")
          .matches(/@msec\.edu\.in$/)
          .withMessage("Admin email must end with @msec.edu.in"),
      ],
      [
        // User validation
        body("registrationNumber")
          .exists()
          .matches(/^3115\d{2}\d{3}\d{3}$/)
          .withMessage("Registration number must be in format 3115YYDDD###"),

        body("dateOfBirth")
          .exists()
          .withMessage("Date of birth is required")
          .isISO8601()
          .withMessage("Date of birth must be a valid date (YYYY-MM-DD)"),
      ],
    ],
    "Either valid admin email or user login details must be provided"
  ),
];

const updateProfileValidationRules = () => [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),

  body("email")
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage("Must be a valid email address"),

  body("dateOfBirth")
    .optional()
    .isISO8601()
    .withMessage("Date of birth must be a valid date (YYYY-MM-DD)"),
];

module.exports = {
  registerValidationRules,
  loginValidationRules,
  updateProfileValidationRules,
};
