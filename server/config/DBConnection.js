//import and use mongoose
const mongoose = require('mongoose');

const dbUrl = 'mongodb://localhost:27017/todo';

const connectDB = async () => {
  const connection = await mongoose.connect(dbUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
module.exports = connectDB;
