const express = require("express");
const router = express.Router();
const userController = require("./userController");
const { authenticate, authorize } = require("../middleware/auth");

// User profile routes
router.get("/profile", authenticate, userController.getProfile);
router.put("/profile", authenticate, userController.updateProfile);
// Removed the /password route

// Admin routes for user management
router.get(
  "/allUsers",
  authenticate,
  authorize("admin"),
  userController.getAllUsers
);
router.get("/:id", authenticate, userController.getUserById);
router.put("/:id", authenticate, authorize("admin"), userController.updateUser);
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
