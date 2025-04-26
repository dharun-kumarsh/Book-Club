const userService = require('./userService');
const { adminUpdateUserSchema } = require('./userValidation');
const logger = require('../utils/logger');

class UserController {
  // Get user profile - to be used by the authenticated user
  async getProfile(req, res, next) {
    try {
      // Use the authenticated user's ID from the request
      const userId = req.user.id;
      const userProfile = await userService.getUserProfile(userId);
      
      res.status(200).json({
        success: true,
        data: userProfile
      });
    } catch (error) {
      next(error);
    }
  }

  // Get user by ID - Admin or self only
  async getUserById(req, res, next) {
    try {
      const { id } = req.params;
      
      // Check if the requesting user has permission (admin or self)
      if (req.user.role !== 'admin' && req.user.id !== id) {
        return res.status(403).json({
          success: false,
          message: 'You are not authorized to access this user profile'
        });
      }
      
      const user = await userService.getUserById(id);
      
      res.status(200).json({
        success: true,
        data: user
      });
    } catch (error) {
      next(error);
    }
  }

  // Get all users - Admin only
  async getAllUsers(req, res, next) {
    try {
      // Check if user is admin
      if (req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'You are not authorized to access all users'
        });
      }
      
      const result = await userService.getAllUsers(req.query);
      
      res.status(200).json({
        success: true,
        data: result.users,
        pagination: result.pagination
      });
    } catch (error) {
      next(error);
    }
  }

  // Update user profile
  async updateProfile(req, res, next) {
    try {
      const userId = req.user.id;
      const updatedUser = await userService.updateUser(userId, req.body);
      
      res.status(200).json({
        success: true,
        data: updatedUser,
        message: 'Profile updated successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  // Update user by ID - Admin only
  async updateUser(req, res, next) {
    try {
      // Validate admin update data
      const { error, value } = adminUpdateUserSchema.validate(req.body);
      if (error) {
        return res.status(400).json({
          success: false,
          message: error.details[0].message
        });
      }
      
      // Check if user is admin
      if (req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'You are not authorized to update other users'
        });
      }
      
      const { id } = req.params;
      const updatedUser = await userService.updateUser(id, value);
      
      res.status(200).json({
        success: true,
        data: updatedUser,
        message: 'User updated successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  // Update password
  async updatePassword(req, res, next) {
    try {
      const userId = req.user.id;
      const result = await userService.updatePassword(userId, req.body);
      
      res.status(200).json({
        success: true,
        message: result.message
      });
    } catch (error) {
      next(error);
    }
  }

  // Delete own account
  async deleteAccount(req, res, next) {
    try {
      const userId = req.user.id;
      const result = await userService.deleteUser(userId);
      
      res.status(200).json({
        success: true,
        message: result.message
      });
    } catch (error) {
      next(error);
    }
  }

  // Delete user by ID - Admin only
  async deleteUser(req, res, next) {
    try {
      // Check if user is admin
      if (req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'You are not authorized to delete users'
        });
      }
      
      const { id } = req.params;
      
      // Prevent admins from deleting themselves
      if (id === req.user.id) {
        return res.status(400).json({
          success: false,
          message: 'You cannot delete your own admin account through this endpoint'
        });
      }
      
      const result = await userService.deleteUser(id);
      
      res.status(200).json({
        success: true,
        message: result.message
      });
    } catch (error) {
      next(error);
    }
  }

  // Hard delete user - Admin only
  async hardDeleteUser(req, res, next) {
    try {
      // Check if user is admin
      if (req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'You are not authorized to permanently delete users'
        });
      }
      
      const { id } = req.params;
      
      // Log this high-risk operation
      logger.warn(`Admin ${req.user.id} attempting to permanently delete user ${id}`);
      
      const result = await userService.hardDeleteUser(id);
      
      res.status(200).json({
        success: true,
        message: result.message
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();