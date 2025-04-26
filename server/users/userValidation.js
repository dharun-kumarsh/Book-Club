const Joi = require('joi');

// User creation validation schema
const createUserSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(100).required(),
  firstName: Joi.string().allow('', null),
  lastName: Joi.string().allow('', null),
  role: Joi.string().valid('user', 'admin'),
  profilePicture: Joi.string().uri().allow('', null),
  bio: Joi.string().allow('', null),
});

// User update validation schema
const updateUserSchema = Joi.object({
  username: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  firstName: Joi.string().allow('', null),
  lastName: Joi.string().allow('', null),
  profilePicture: Joi.string().uri().allow('', null),
  bio: Joi.string().allow('', null),
  preferences: Joi.object(),
  status: Joi.string().valid('active', 'suspended', 'deleted'),
});

// Password update validation schema
const updatePasswordSchema = Joi.object({
  currentPassword: Joi.string().min(6).required(),
  newPassword: Joi.string().min(6).max(100).required(),
  confirmPassword: Joi.string().valid(Joi.ref('newPassword')).required()
    .messages({ 'any.only': 'Passwords do not match' }),
});

// Admin update user validation schema
const adminUpdateUserSchema = Joi.object({
  username: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  firstName: Joi.string().allow('', null),
  lastName: Joi.string().allow('', null),
  role: Joi.string().valid('user', 'admin'),
  profilePicture: Joi.string().uri().allow('', null),
  bio: Joi.string().allow('', null),
  preferences: Joi.object(),
  status: Joi.string().valid('active', 'suspended', 'deleted'),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  updatePasswordSchema,
  adminUpdateUserSchema,
};