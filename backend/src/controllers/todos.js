const Todo = require('../models/todos');
const User = require('../models/users');
const jwt = require('jsonwebtoken');

const todosRouter = require('express').Router();

function getTokenFrom(request) {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
}

//Get all todos
todosRouter.get('/', async (request, response) => {
  const todos = await Todo.find({}).populate('user', { username: 1, id: 1 });

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
  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id);

  const todo = new Todo({
    name: body.name,
    done: body.done,
    user: user._id
  });

  try {
    const savedTodo = await todo.save();
    user.todos = user.todos.concat(savedTodo._id);
    await user.save();
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

  //Update to work with users;
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