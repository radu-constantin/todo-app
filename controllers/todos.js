const Todo = require('../models/todos');

const todosRouter = require('express').Router();

todosRouter.get('/', (request, response) => {
  Todo.find({}).then(todos => {
    response.json(todos);
  })
  .catch(error => {
    error.log(`Error: ${error}`);
  })
})

module.exports = todosRouter;