const express = require('express');
const router = express.Router();

const register = require('./user/register');

router.post('/user/create', register);

module.exports = router;
