const { ACCESS_TOKEN_KEY } = require('../../config/keys');
const { asyncHandler } = require('../../middlewares/errorHandlers');
const Todo = require('../../models/TodoItem');
const jwt = require('jsonwebtoken');

module.exports = asyncHandler(async (req, res, next) => {
  req.body.user = mongoose.Types.ObjectId(req.body.user);

  const todos = await User.findById(req.body.ObjectId, { todos: 1 });
  console.log(todos);
  // authenticate JWT token
  // if no token, error
  const authHeader = req.cookies['access-token'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  // verify token if there is one
  jwt.verify(token, ACCESS_TOKEN_KEY, (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });

  res.send(todo);
});
