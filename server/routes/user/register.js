const bcrypt = require('bcrypt');
const { asyncHandler } = require('../../middlewares/errorHandlers');

const User = require('../../models/User');
const { userRegisterAuth } = require('../../validation/user/register');

module.exports = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const validate = await userRegisterAuth.validateAsync(req.body);

  // Check if user exists
  const doesUserExist = await User.findOne({ email: email });

  if (doesUserExist) return res.status(400).send('User Already Exists');

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
