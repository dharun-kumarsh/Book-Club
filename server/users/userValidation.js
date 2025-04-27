const Joi = require("joi");

const createUserSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  dateOfBirth: Joi.date().iso().required(),
  role: Joi.string().valid("user", "admin"),
});

const updateUserSchema = Joi.object({
  username: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  dateOfBirth: Joi.date().iso(),
  role: Joi.string().valid("user", "admin"),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
};
