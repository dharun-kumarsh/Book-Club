const Joi = require("joi");

// Schema for creating a user
const createUserSchema = Joi.object({
  // Common fields
  name: Joi.string().min(3).max(50),
  dateOfBirth: Joi.date().iso(),
  role: Joi.string().valid("user", "admin"),
  
  // Conditional fields based on role
  email: Joi.string().email().pattern(/@msec\.edu\.in$/).when('role', {
    is: 'admin',
    then: Joi.required(),
    otherwise: Joi.forbidden()
  }),
  
  registrationNumber: Joi.string().pattern(/^3115\d{2}\d{3}\d{3}$/).when('role', {
    is: 'user',
    then: Joi.required(),
    otherwise: Joi.forbidden()
  })
}).xor('email', 'registrationNumber');

// Schema for updating a user
const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(50),
  dateOfBirth: Joi.date().iso(),
  email: Joi.string().email().pattern(/@msec\.edu\.in$/),
  registrationNumber: Joi.string().pattern(/^3115\d{2}\d{3}\d{3}$/),
  status: Joi.string().valid("active", "inactive", "suspended")
});

module.exports = {
  createUserSchema,
  updateUserSchema,
};