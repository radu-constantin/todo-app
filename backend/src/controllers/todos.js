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
    if (error.name === 'CastError') {
      response.status(400).json({error: 'Invalid todo ID!'});
    }
  };
});

//Post a todo
todosRouter.post('/', async (request, response) => {
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
    if (error.name === "ValidationError") {
      response.status(400).json({error: `The '${error.errors.name.path}' field is required!`});
    }
  }
});

//Delete a todo
todosRouter.delete('/:id', async (request, response) => {
  try {
    const deletedTodo = await Todo.findByIdAndRemove(request.params.id);
    console.log(deletedTodo);
    response.status(204).json(deletedTodo);
  }
  catch (error) {
    response.status(404).json(error);
  }
});

//Update a todo;
todosRouter.put('/:id', (request, response) => {
  const body = request.body;

  const todo = {
    name: body.name,
    details: body.details,
    done: body.done
  }

  Todo.findByIdAndUpdate(request.params.id, todo, { new: true }).then((updatedTodo) => {
    response.status(200).json(updatedTodo);
  })
    .catch((error) => {
      response.status(404).end();
    });
})

module.exports = todosRouter;