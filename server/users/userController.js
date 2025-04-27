const userService = require("./userService");
const logger = require("../utils/logger");

class UserController {
  async getProfile(req, res, next) {
    try {
      const userId = req.user.id;
      const userProfile = await userService.getUserProfile(userId);

      res.status(200).json({
        success: true,
        data: userProfile,
      });
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req, res, next) {
    try {
      const { id } = req.params;

      if (req.user.role !== "admin" && req.user.id !== id) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized access",
        });
      }

      const user = await userService.getUserById(id);

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllUsers(req, res, next) {
    try {
      if (req.user.role !== "admin") {
        return res.status(403).json({
          success: false,
          message: "Admin access required",
        });
      }

      const result = await userService.getAllUsers(req.query);

      res.status(200).json({
        success: true,
        data: result.users,
        pagination: result.pagination,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req, res, next) {
    try {
      const userId = req.user.id;
      const updatedUser = await userService.updateUser(userId, req.body);

      res.status(200).json({
        success: true,
        data: updatedUser,
        message: "Profile updated successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async updatePassword(req, res, next) {
    try {
      const userId = req.user.id;
      const { oldPassword, newPassword } = req.body;

      await userService.updateUserPassword(userId, oldPassword, newPassword); // Assuming this method exists in userService

      res.status(200).json({
        success: true,
        message: "Password updated successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  // Assuming you have these methods in your userService and want to expose them via the controller
  async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const updatedUser = await userService.updateUser(id, req.body);
      res
        .status(200)
        .json({
          success: true,
          data: updatedUser,
          message: "User updated successfully",
        });
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      await userService.deleteUser(id);
      res.status(204).send(); // No content on successful deletion
    } catch (error) {
      next(error);
    }
  }

  async hardDeleteUser(req, res, next) {
    try {
      const { id } = req.params;
      await userService.hardDeleteUser(id);
      res.status(204).send(); // No content on successful permanent deletion
    } catch (error) {
      next(error);
    }
  }

  async deleteAccount(req, res, next) {
    try {
      const userId = req.user.id;
      await userService.deleteUser(userId); // Or a specific deleteAccount method
      res.status(204).send(); // No content on successful account deletion
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
