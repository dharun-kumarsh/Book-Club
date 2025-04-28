const express = require("express");
const router = express.Router();
const authController = require("./authController");
const {
  loginValidationRules,
  registerValidationRules,
} = require("../middleware/validation");

router.post("/login", loginValidationRules(), authController.login);
router.post("/register", registerValidationRules(), authController.register);

module.exports = router;
