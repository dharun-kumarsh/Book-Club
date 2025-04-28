// const express = require("express");
// const router = express.Router();
// const authController = require("./authController");
// const {
//   loginValidationRules,
//   registerValidationRules,
// } = require("../middleware/validation");
import express from 'express';
import * as authController from './authController.js'; // Or adjust based on how authController exports
import {
  loginValidationRules,
  registerValidationRules,
} from '../middleware/validation.js';

const router = express.Router();

router.post("/login", loginValidationRules(), authController.login);
router.post("/register", registerValidationRules(), authController.register);

module.exports = router;
