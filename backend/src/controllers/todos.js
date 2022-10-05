const Todo = require('../models/todos');
const User = require('../models/users');

const todosRouter = require('express').Router();

const jwt = require('jsonwebtoken');

function getTokenFrom(request) {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }

  return null;
}

//Get all todos
todosRouter.get('/', async (request, response) => {
  const todos = await Todo.find({}).populate('user', { username: 1 });

  response.json(todos);

  // Todo.find({}).then((todos) => {
  //   response.status(200).json(todos);
  // })
  // .catch((error) => {
  //   console.log(`Error: ${error}`);
  // })
});

//Get specific todo by id
todosRouter.get('/:id', (request, response) => {
  Todo.findById(request.params.id).then((todo) => {
    if (todo) {
      response.status(200).json(todo);
    } else {
      response.status(404).end();
    }
  })
    .catch((error) => {
      console.log(`Error: ${error}`);
    })
});

//Post a todo
todosRouter.post('/', async (request, response) => {
  const body = request.body;
  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'Token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id);

  const todo = new Todo({
    name: body.name,
    details: body.details,
    done: body.done,
    user: user.id
  });

  try {
    const savedTodo = await todo.save();
    user.todos = user.todos.concat(savedTodo.id);
    await user.save();
    response.status(201).json(savedTodo);
  } catch (error) {
    response.status(400).end();
  }

  // todo.save()
  //   .then((savedTodo) => {
  //     user.todos = user.todos.concat(savedTodo._id);

  //     response.status(201).json(savedTodo)
  //   })
  //   .catch((error) =>{
  //     
  //   })
});

//Delete a todo
todosRouter.delete('/:id', (request, response) => {
  Todo.findByIdAndRemove(request.params.id)
    .then((todo) => { //Should I send back the deleted todo?!
      response.status(204).end();
    })
    .catch((error) => {
      response.status(404).end();
    })
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