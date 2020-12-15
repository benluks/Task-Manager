const Joi = require('joi');
const user = require('../../models/User');

const addTodoAuth = Joi.object({
  title: Joi.string(),
  user: Joi.string(),
  description: Joi.string(),
  complete: Joi.boolean(),
});

module.exports = { addTodoAuth };
