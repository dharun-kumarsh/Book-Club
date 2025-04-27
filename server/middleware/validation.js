const { body } = require('express-validator');

const registerValidationRules = () => [
  body('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
  body('email').isEmail().normalizeEmail().withMessage('Must be a valid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('dateOfBirth').notEmpty().withMessage('Date of birth is required').isISO8601().withMessage('Date of birth must be a valid date (YYYY-MM-DD)'),
];

const loginValidationRules = () => [
  body('email').isEmail().normalizeEmail().withMessage('Must be a valid email address'),
  body('dateOfBirth').notEmpty().withMessage('Date of birth is required').isISO8601().withMessage('Date of birth must be a valid date (YYYY-MM-DD)')
];

const updateProfileValidationRules = () => [
  body('username').optional().trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
  body('email').optional().isEmail().normalizeEmail().withMessage('Must be a valid email address')
];


module.exports = {
  registerValidationRules,
  loginValidationRules,
  updateProfileValidationRules,

};