const Joi = require('joi');

// Validate registration
const userRegisterAuth = Joi.object({
  name: { first: Joi.string(), last: Joi.string() },
  email: Joi.string().email(),
  password: Joi.string().pattern(
    new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})')
  ),
  confirmPassword: Joi.ref('password'),
});

module.exports = { userRegisterAuth };
