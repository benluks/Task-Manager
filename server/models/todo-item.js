const mongoose = require('mongoose');

const todoSchema = mongoose.Schema(
  {
    todoItems: {
      type: String,
      required: true,
    },
    complete: {
      type: Boolean,
      required: true,
    },
    description: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { autoCreate: true }
);

module.exports = mongoose.model('TodoItem', todoSchema);
