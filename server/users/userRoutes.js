// const express = require("express");
// const router = express.Router();
// const userController = require("./userController");
// const { authenticate, authorize } = require("../middleware/auth");
// const { updateProfileValidationRules } = require("../middleware/validation");
import express from "express";
const router = express.Router();
import * as userController from "./userController";
import { authenticate, authorize } from "../middleware/auth";
import { updateProfileValidationRules } from "../middleware/validation";
// Make sure userController is properly imported and all methods exist
// User profile routes
router.get("/profile", authenticate, userController.getProfile);
router.put(
  "/profile",
  authenticate,
  updateProfileValidationRules(),
  userController.updateProfile
);

// Admin routes for user management
router.get(
  "/allUsers",
  authenticate,
  authorize("admin"),
  userController.getAllUsers
);
router.get(
  "/:id",
  authenticate,
  authorize("admin"),
  userController.getUserById
);
router.put(
  "/:id",
  authenticate,
  authorize("admin"),
  updateProfileValidationRules(),
  userController.updateUser
);
router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  userController.deleteUser
);
router.delete(
  "/:id/permanent",
  authenticate,
  authorize("admin"),
  userController.hardDeleteUser
);

module.exports = router;
