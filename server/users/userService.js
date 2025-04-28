const User = require("./userModel");
const { Op } = require("sequelize");
const logger = require("../utils/logger");

class UserService {
  async getUserById(userId) {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw { statusCode: 404, message: "User not found" };
      }
      return user;
    } catch (error) {
      logger.error(`Get user by ID error: ${error.message}`);
      throw error;
    }
  }

  async getUserProfile(userId) {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw { statusCode: 404, message: "User not found" };
      }

      // Return different fields based on role
      if (user.role === "admin") {
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          dateOfBirth: user.dateOfBirth,
        };
      } else {
        return {
          id: user.id,
          name: user.name,
          registrationNumber: user.registrationNumber,
          role: user.role,
          dateOfBirth: user.dateOfBirth,
        };
      }
    } catch (error) {
      logger.error(`Get user profile error: ${error.message}`);
      throw error;
    }
  }

  async getAllUsers(query = {}) {
    try {
      const { page = 1, limit = 10, role, search } = query;
      const offset = (page - 1) * limit;

      const whereClause = {};

      if (role) {
        whereClause.role = role;
      }

      if (search) {
        whereClause[Op.or] = [
          { name: { [Op.iLike]: `%${search}%` } },
          { email: { [Op.iLike]: `%${search}%` } },
          { registrationNumber: { [Op.iLike]: `%${search}%` } },
        ];
      }

      const { count, rows } = await User.findAndCountAll({
        where: whereClause,
        limit: parseInt(limit),
        offset,
        order: [["createdAt", "DESC"]],
      });

      return {
        users: rows,
        pagination: {
          total: count,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(count / limit),
        },
      };
    } catch (error) {
      logger.error(`Get all users error: ${error.message}`);
      throw error;
    }
  }

  async updateUser(userId, updateData) {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw { statusCode: 404, message: "User not found" };
      }

      // Email update validation for admins
      if (updateData.email && updateData.email !== user.email) {
        // Only admins can have email
        if (!updateData.email.endsWith("@msec.edu.in")) {
          throw {
            statusCode: 400,
            message: "Admin email must end with @msec.edu.in",
          };
        }

        const existingUser = await User.findOne({
          where: { email: updateData.email },
        });
        if (existingUser) {
          throw { statusCode: 409, message: "Email already in use" };
        }
      }

      // Registration number update validation for users
      if (
        updateData.registrationNumber &&
        updateData.registrationNumber !== user.registrationNumber
      ) {
        // Validate format
        if (!/^3115\d{2}\d{3}\d{3}$/.test(updateData.registrationNumber)) {
          throw {
            statusCode: 400,
            message: "Invalid registration number format",
          };
        }

        const existingUser = await User.findOne({
          where: { registrationNumber: updateData.registrationNumber },
        });
        if (existingUser) {
          throw {
            statusCode: 409,
            message: "Registration number already taken",
          };
        }
      }

      await user.update(updateData);
      return user;
    } catch (error) {
      logger.error(`Update user error: ${error.message}`);
      throw error;
    }
  }

  async deleteUser(userId) {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw { statusCode: 404, message: "User not found" };
      }
      await user.destroy(); // Soft delete
      return { message: "User deleted successfully" };
    } catch (error) {
      logger.error(`Delete user error: ${error.message}`);
      throw error;
    }
  }

  async hardDeleteUser(userId) {
    try {
      const user = await User.findByPk(userId, { paranoid: false }); // Include soft-deleted records
      if (!user) {
        throw { statusCode: 404, message: "User not found" };
      }
      await user.destroy({ force: true }); // Force permanent deletion
      return { message: "User permanently deleted" };
    } catch (error) {
      logger.error(`Hard delete user error: ${error.message}`);
      throw error;
    }
  }
}

// Make sure to export an instance of the class
module.exports = new UserService();
