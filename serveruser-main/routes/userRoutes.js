const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { validate } = require("express-validator"); // Import validate function (or just use validationResult directly in controller)
const authMiddleware = require("../middleware/auth");
const {
  registerValidationRules,
  loginValidationRules,
  updateProfileValidationRules,
  forgotPasswordValidationRules,
  resetPasswordValidationRules,
} = require("../middleware/validation");

// Registration
router.post(
  "/register",
  registerValidationRules(),
  userController.registerUser
);

// Login
router.post("/login", loginValidationRules(), userController.loginUser);

// Get Profile (Protected route)
router.get("/profile", authMiddleware, userController.getProfile);

// Update Profile (Protected route)
router.put(
  "/profile",
  authMiddleware,
  updateProfileValidationRules(),
  userController.updateProfile
);

// Request Password Reset
router.post(
  "/password/forgot",
  forgotPasswordValidationRules(),
  userController.requestPasswordReset
);

// Reset Password
router.post(
  "/password/reset",
  resetPasswordValidationRules(),
  userController.resetPassword
);

module.exports = router;
