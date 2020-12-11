const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  const { email, password } = data;

  if (Validator.isEmpty(email)) {
    errors.email = 'Email required';
  } else if (!Validator.isEmail(email)) {
    errors.email = 'Please enter a valid email address';
  }
  if (Validator.isEmpty(password)) errors.empty = 'Password required';

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
