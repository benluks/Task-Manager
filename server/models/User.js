const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: { first: String, last: String },
  email: String,
  password: String,
  date: { type: Date, default: Date.now },
});

module.exports = User = mongoose.model('User', UserSchema);
