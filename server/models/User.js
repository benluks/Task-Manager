const mongoose = require('mongoose');
const TodoItem = require('./TodoItem');

const UserSchema = mongoose.Schema({
  name: { first: String, last: String },
  email: String,
  password: String,
  date: { type: Date, default: Date.now },
  todos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TodoItem' }],
});

module.exports = mongoose.model('User', UserSchema);
