const express = require("express");
const router = express.Router();
const userController = require("./userController");
const { authenticate, authorize } = require("../middleware/auth");

// User profile routes
router.get("/profile", authenticate, userController.getProfile);
router.put("/profile", authenticate, userController.updateProfile);
router.put("/password", authenticate, userController.updatePassword); // Ensure updatePassword is in userController
router.delete("/profile", authenticate, userController.deleteAccount); // Assuming you have this

// Admin routes for user management
router.get(
  "/allUsers",
  authenticate,
  authorize("admin"),
  userController.getAllUsers
);
router.get("/:id", authenticate, userController.getUserById);
router.put("/:id", authenticate, authorize("admin"), userController.updateUser); // Assuming you have this
router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  userController.deleteUser // Assuming you have this
);
router.delete(
  "/:id/permanent",
  authenticate,
  authorize("admin"),
  userController.hardDeleteUser // Assuming you have this
);

module.exports = router;
