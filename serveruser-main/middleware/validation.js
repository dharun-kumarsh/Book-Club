const { body } = require("express-validator");

// Custom validator for a strong password
const isStrongPassword = (password) => {
  return (
    typeof password === "string" &&
    password.length >= 8 &&
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /\d/.test(password) &&
    /[!@#$%^&*(),.?":{}|<>]/.test(password)
  );
};

// Validation rules for user registration
const registerValidationRules = () => {
  return [
    body("username").notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .custom(isStrongPassword)
      .withMessage(
        "Password must be at least 8 characters, and contain lowercase, uppercase, and a number"
      ),
  ];
};

// Validation rules for user login
const loginValidationRules = () => {
  return [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").notEmpty().withMessage("Password is required"),
  ];
};

// Validation rules for updating profile
const updateProfileValidationRules = () => {
  return [
    body("username")
      .optional()
      .notEmpty()
      .withMessage("Username cannot be empty"),
    body("email").optional().isEmail().withMessage("Invalid email address"),
  ];
};

// Validation rules for requesting password reset
const forgotPasswordValidationRules = () => {
  return [body("email").isEmail().withMessage("Invalid email address")];
};

// Validation rules for resetting password
const resetPasswordValidationRules = () => {
  return [
    body("token").notEmpty().withMessage("Token is required"),
    body("newPassword")
      .custom(isStrongPassword)
      .withMessage(
        "New password must be at least 8 characters, and contain lowercase, uppercase, and a number"
      ),
  ];
};

module.exports = {
  isStrongPassword,
  registerValidationRules,
  loginValidationRules,
  updateProfileValidationRules,
  forgotPasswordValidationRules,
  resetPasswordValidationRules,
};
