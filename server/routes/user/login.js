const User = require('../../models/User');
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');
const { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } = require('../../config/keys');
const { userLoginAuth } = require('../../validation/user/login');
const { asyncHandler } = require('../../middlewares/errorHandlers');

module.exports = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const validate = await userLoginAuth.validateAsync(req.body);

  user = await User.findOne({ email: email });

  if (user == null)
    return res.status(400).json({ emailnotfound: 'Email not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ incorrectpassword: 'Incorrect password' });
  }

  const payload = {
    id: user.id,
    name: user.name,
  };

  // Sign tokens
  const refreshToken = sign(payload, REFRESH_TOKEN_KEY, { expiresIn: '7d' });
  const accessToken = sign(payload, ACCESS_TOKEN_KEY, {
    expiresIn: '15min',
  });

  // send cookies
  res
    .cookie('refresh-token', refreshToken, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // exp in 7 days
    })
    .cookie('access-token', accessToken, {
      expires: new Date(Date.now() + 1000 * 60 * 15), // 15 mins
    })
    // send 200
    .sendStatus(200);
});
