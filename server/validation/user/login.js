const Joi = require('joi');

// validate login
const userLoginAuth = Joi.object({
  email: Joi.string().email(),
  password: Joi.string(),
});

module.exports = { userLoginAuth };
