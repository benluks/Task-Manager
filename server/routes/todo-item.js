const express = require('express');
const router = express.Router();
const TodoItem = require('../models/todo-item');

router.post('/', (req, res) => {
  const item = req.body;
  TodoItem.create(item, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

module.exports = router;
