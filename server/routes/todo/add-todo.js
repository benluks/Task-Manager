const { asyncHandler } = require('../../middlewares/errorHandlers');
const Todo = require('../../models/TodoItem');
const User = require('../../models/User');
const mongoose = require('mongoose');
const { addTodoAuth } = require('../../validation/todo/add-todo');

module.exports = asyncHandler(async (req, res, next) => {
  const validate = addTodoAuth.validateAsync(req.body);

  const user = await User.findById(req.body.user);
  if (user == null) return res.sendStatus(400);

  try {
    const newTodo = new Todo(req.body);
    await newTodo.save();
    res.status(201).send(newTodo);
  } catch (err) {
    console.log(err);
  }
});
