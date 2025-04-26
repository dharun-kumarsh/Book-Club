const User = require('./userModel');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { createUserSchema, updateUserSchema, updatePasswordSchema } = require('./userValidation');

class UserService {
  // Create a new user
  async createUser(userData) {
    // Validate user data
    const { error, value } = createUserSchema.validate(userData);
    if (error) {
      throw { statusCode: 400, message: error.details[0].message };
    }

    // Check if user with same email or username already exists
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [
          { email: value.email },
          { username: value.username }
        ]
      }
    });

    if (existingUser) {
      throw {
        statusCode: 409,
        message: 'User with this email or username already exists',
      };
    }

    // Create and return new user
    const user = await User.create(value);
    return user;
  }

  // Get user by ID
  async getUserById(userId) {
    const user = await User.findByPk(userId, {
      include: ['reviews'],
    });

    if (!user) {
      throw { statusCode: 404, message: 'User not found' };
    }

    return user;
  }

  // Get user profile (similar to getUserById but with specific fields)
  async getUserProfile(userId) {
    const user = await User.findByPk(userId, {
      attributes: [
        'id', 'username', 'email', 'firstName', 'lastName',
        'profilePicture', 'bio', 'preferences', 'status', 'createdAt'
      ],
      include: [{
        association: 'reviews',
        attributes: ['id', 'rating', 'content', 'bookId', 'createdAt'],
      }],
    });

    if (!user) {
      throw { statusCode: 404, message: 'User profile not found' };
    }

    return user;
  }

  // Get all users (with pagination and filtering)
  async getAllUsers(query = {}) {
    const { page = 1, limit = 10, status, role, search } = query;
    const offset = (page - 1) * limit;
    
    // Build where clause based on filters
    const whereClause = {};
    
    if (status) {
      whereClause.status = status;
    }
    
    if (role) {
      whereClause.role = role;
    }
    
    if (search) {
      whereClause[Op.or] = [
        { username: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } },
        { firstName: { [Op.iLike]: `%${search}%` } },
        { lastName: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const { count, rows } = await User.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset,
      order: [['createdAt', 'DESC']],
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
  }

  // Update user data
  async updateUser(userId, updateData) {
    // Validate update data
    const { error, value } = updateUserSchema.validate(updateData);
    if (error) {
      throw { statusCode: 400, message: error.details[0].message };
    }

    const user = await User.findByPk(userId);
    if (!user) {
      throw { statusCode: 404, message: 'User not found' };
    }

    // Check if email or username is being updated and is already taken
    if (value.email && value.email !== user.email) {
      const existingUser = await User.findOne({
        where: { email: value.email }
      });
      
      if (existingUser) {
        throw { statusCode: 409, message: 'Email address is already in use' };
      }
    }

    if (value.username && value.username !== user.username) {
      const existingUser = await User.findOne({
        where: { username: value.username }
      });
      
      if (existingUser) {
        throw { statusCode: 409, message: 'Username is already taken' };
      }
    }

    // Update user
    await user.update(value);
    return user;
  }

  // Update password
  async updatePassword(userId, passwords) {
    // Validate password data
    const { error, value } = updatePasswordSchema.validate(passwords);
    if (error) {
      throw { statusCode: 400, message: error.details[0].message };
    }

    const user = await User.findByPk(userId);
    if (!user) {
      throw { statusCode: 404, message: 'User not found' };
    }

    // Verify current password
    const isPasswordValid = await user.validatePassword(value.currentPassword);
    if (!isPasswordValid) {
      throw { statusCode: 401, message: 'Current password is incorrect' };
    }

    // Update password
    user.password = value.newPassword;
    await user.save();
    
    return { message: 'Password updated successfully' };
  }

  // Delete user (soft delete)
  async deleteUser(userId) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw { statusCode: 404, message: 'User not found' };
    }

    // Soft delete by changing status
    await user.update({ status: 'deleted' });
    
    return { message: 'User account deleted successfully' };
  }

  // Hard delete (for admins or data cleanup)
  async hardDeleteUser(userId) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw { statusCode: 404, message: 'User not found' };
    }

    await user.destroy();
    return { message: 'User permanently deleted from the system' };
  }

  // Update user last login time
  async updateLastLogin(userId) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw { statusCode: 404, message: 'User not found' };
    }

    await user.update({ lastLogin: new Date() });
    return user;
  }
}

module.exports = new UserService();