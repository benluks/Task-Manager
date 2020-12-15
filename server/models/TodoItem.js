const mongoose = require('mongoose');
const User = require('./User');

const todoSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    complete: { type: Boolean, required: true },
    description: String,
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { autoCreate: true }
);

module.exports = mongoose.model('TodoItem', todoSchema);
