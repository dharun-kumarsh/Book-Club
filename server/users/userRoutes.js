const express = require('express');
const router = express.Router();
const userController = require('./userController');
const authMiddleware = require('../middleware/auth');
const { updateProfileValidationRules } = require('../middleware/validation');

router.get('/profile', authMiddleware, userController.getProfile);
router.put('/profile', authMiddleware, updateProfileValidationRules(), userController.updateProfile);
router.delete('/profile', authMiddleware, userController.deleteProfile);

module.exports = router;