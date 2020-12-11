const bcrypt = require('bcrypt');
const { ValidationError } = require('joi');
const { asyncHandler } = require('../../middlewares/errorHandlers');

const User = require('../../models/User');
const { userRegisterAuth } = require('../../validation/register');

module.exports = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const validate = userRegisterAuth.validateAsync(req.body);

  // Check if user exists
  const doesUserExist = await User.find({ email: email });

  if (doesUserExist.length !== 0)
    throw createError.Conflict('User Already Exists');

  // Hash Password
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hashedPassword) => {
      if (err) throw err;
      req.body.password = hashedPassword;
      // Save the user
      const user = new User(req.body);
      const savedUser = await user.save();
      savedUser.password = undefined; // remove password from the user object
      res.status(201);
      res.send(savedUser);
    });
  });
});
