const express = require('express');
const router = express.Router();
const authController = require('./authController');
const { loginValidationRules, registerValidationRules, resetPasswordValidationRules } = require('../middleware/validation');

router.post('/login', loginValidationRules(), authController.login);
router.post('/register', registerValidationRules(), authController.register);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', resetPasswordValidationRules(), authController.resetPassword);

module.exports = router;