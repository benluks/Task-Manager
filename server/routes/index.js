const express = require('express');
const router = express.Router();

const registerUser = require('./user/register');
const login = require('./user/login');

const addTodo = require('./todo/add-todo');
const getTodos = require('./todo/get-todos');

router.post('/user/create', registerUser).post('/user/login', login);

router.post('/todo/add-todo', addTodo).get('/todo/get-todos', getTodos);

module.exports = router;
