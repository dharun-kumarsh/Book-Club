const User = require('./userModel');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

class UserService {
  async getUserById(userId) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw { statusCode: 404, message: 'User not found' };
    }
    return user;
  }

  async getUserProfile(userId) {
    const user = await User.findByPk(userId, {
      attributes: ['id', 'username', 'email', 'role', 'dateOfBirth']
    });
    if (!user) {
      throw { statusCode: 404, message: 'User not found' };
    }
    return user;
  }

  async getAllUsers(query = {}) {
    const { page = 1, limit = 10, role, search } = query;
    const offset = (page - 1) * limit;
    
    const whereClause = {};
    
    if (role) {
      whereClause.role = role;
    }
    
    if (search) {
      whereClause[Op.or] = [
        { username: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const { count, rows } = await User.findAndCountAll({
      where: whereClause,
      attributes: ['id', 'username', 'email', 'role', 'dateOfBirth'],
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

  async updateUser(userId, updateData) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw { statusCode: 404, message: 'User not found' };
    }

    if (updateData.email && updateData.email !== user.email) {
      const existingUser = await User.findOne({
        where: { email: updateData.email }
      });
      if (existingUser) {
        throw { statusCode: 409, message: 'Email already in use' };
      }
    }

    if (updateData.username && updateData.username !== user.username) {
      const existingUser = await User.findOne({
        where: { username: updateData.username }
      });
      if (existingUser) {
        throw { statusCode: 409, message: 'Username already taken' };
      }
    }

    await user.update(updateData);
    return user;
  }
}

module.exports = new UserService();