const express = require('express');
const User = require('../../models/User');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secretOrKey, JWTExpirationTime } = require('../../config/keys');
const validateLoginInput = require('../../validation/login');

router.post('/', (req, res) => {
  const { error, isValid } = validateLoginInput(req.body);

  if (!isValid) return res.status(400).json(errors);

  const { email, password } = req.body;
  User.findOne({ email: email }).then((user) => {
    if (!user)
      return res.status(404).json({ emailnotfound: 'Email not found' });

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        // create JWT payload
        const payload = {
          id: user.id,
          name: user.name,
        };

        // Sign token
        jwt.sign(
          payload,
          secretOrKey,
          {
            expiresIn: JWTExpirationTime,
          },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ incorrectpassword: 'Incorrect password' });
      }
    });
  });
});

module.exports = router;
