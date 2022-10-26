const Todo = require('../models/todos');
const User = require('../models/users');

const todosRouter = require('express').Router();

//Get all todos
todosRouter.get('/', async (request, response) => {
  const todos = await Todo.find({});

  response.json(todos);
});

//Get specific todo by id
todosRouter.get('/:id', async (request, response, next) => {
  try {
    const todo = await Todo.findById(request.params.id);
    if (todo) {
      response.status(200).json(todo);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  };
});

//Post a todo
todosRouter.post('/', async (request, response, next) => {
  const body = request.body;

  const todo = new Todo({
    name: body.name,
    details: body.details,
    done: body.done
  });

  try {
    const savedTodo = await todo.save();
    response.status(201).json(savedTodo);
  } catch (error) {
    next(error);
  }
});

//Delete a todo
todosRouter.delete('/:id', async (request, response, next) => {
  try {
    const deletedTodo = await Todo.findByIdAndRemove(request.params.id);
    if (deletedTodo === null) {
      response.status(404).end();
    } else {
      response.status(204).json({ deletedTodo });
    }
  } catch (error) {
    next(error);
  }
});

//Update a todo;
todosRouter.put('/:id', async (request, response, next) => {
  const body = request.body;

  const todo = {
    name: body.name,
    details: body.details,
    done: body.done
  }

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(request.params.id, todo, { new: true })
    if (updatedTodo === null) {
      response.status(404).end();
    } else {
      response.status(200).json(updatedTodo);
    }
  } catch (error) {
    response.status(404).end();
  };
});

module.exports = todosRouter;