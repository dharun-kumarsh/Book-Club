const { body } = require('express-validator');

const registerValidationRules = () => [
  body('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
  body('email').isEmail().normalizeEmail().withMessage('Must be a valid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

const loginValidationRules = () => [
  body('email').isEmail().normalizeEmail().withMessage('Must be a valid email address'),
  body('password').notEmpty().withMessage('Password is required')
];

const updateProfileValidationRules = () => [
  body('username').optional().trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
  body('email').optional().isEmail().normalizeEmail().withMessage('Must be a valid email address')
];

const forgotPasswordValidationRules = () => [
  body('email').isEmail().normalizeEmail().withMessage('Must be a valid email address')
];

const resetPasswordValidationRules = () => [
  body('token').notEmpty().withMessage('Reset token is required'),
  body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters long')
];

module.exports = {
  registerValidationRules,
  loginValidationRules,
  updateProfileValidationRules,
  forgotPasswordValidationRules,
  resetPasswordValidationRules
};