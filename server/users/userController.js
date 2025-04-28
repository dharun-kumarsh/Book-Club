
// const { validationResult } = require("express-validator");
// const userService = require("./userService");
// const logger = require("../utils/logger");
import { validationResult } from "express-validator";
import * as userService from "./userService";
import logger from "../utils/logger";

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
      logger.error(`Get profile error: ${error.message}`);
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
      logger.error(`Get user by ID error: ${error.message}`);
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
      logger.error(`Get all users error: ${error.message}`);
      next(error);
    }
  }

  async updateProfile(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      
      const userId = req.user.id;
      const updatedUser = await userService.updateUser(userId, req.body);

      res.status(200).json({
        success: true,
        data: updatedUser,
        message: "Profile updated successfully",
      });
    } catch (error) {
      logger.error(`Update profile error: ${error.message}`);
      next(error);
    }
  }

  async updateUser(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      
      const { id } = req.params;
      const updatedUser = await userService.updateUser(id, req.body);
      
      res.status(200).json({
        success: true,
        data: updatedUser,
        message: "User updated successfully",
      });
    } catch (error) {
      logger.error(`Update user error: ${error.message}`);
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      await userService.deleteUser(id);
      res.status(204).send(); // No content on successful deletion
    } catch (error) {
      logger.error(`Delete user error: ${error.message}`);
      next(error);
    }
  }

  async hardDeleteUser(req, res, next) {
    try {
      const { id } = req.params;
      await userService.hardDeleteUser(id);
      res.status(204).send(); // No content on successful permanent deletion
    } catch (error) {
      logger.error(`Hard delete user error: ${error.message}`);
      next(error);
    }
  }
}

// Important: Make sure to export an instance of the class
module.exports = new UserController();