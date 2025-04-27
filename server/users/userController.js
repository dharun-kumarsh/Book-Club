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
}

module.exports = new UserController();
