const express = require('express');
const connectDB = require('./config/DBConnection');
const bodyParser = require('body-parser');
const routes = require('./routes');
const {
  errorHandler,
  initUnhandledExceptions,
} = require('./middlewares/errorHandlers');

const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

// Connect to DB
connectDB();

// routes
app.use('/api', routes);

// Error Handlers
app.use(errorHandler);

// Unhandled Exceptions and rejections handler
initUnhandledExceptions();

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

module.exports = app;
