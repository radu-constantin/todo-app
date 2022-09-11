import { Request, Response } from "express";

const Todo = require('../models/todos');

const todosRouter = require('express').Router();

//Get all todos
todosRouter.get('/', (request: Request, response: Response) => {
  Todo.find({}).then((todos: object) => {
    response.json(todos);
  })
  .catch((error: any) => {
    console.log(`Error: ${error}`);
  })
});

//Get specific todo by id
todosRouter.get('/:id', (request: Request, response: Response) => {
  console.log(request.params.id)
  Todo.findById(request.params.id).then((todo: object) => {
    if (todo) {
      response.json(todo);
    } else {
      response.status(404).end();
    }
  })
  .catch((error: any) => {
    console.log(`Error: ${error}`);
  })
});

//Post a todo
todosRouter.post('/', (request: Request, response: Response) => {
  const body = request.body;

  const todo = new Todo({
    name: body.name,
    details: body.details,
  });

  todo.save()
    .then((savedTodo: object) => {
      response.json(savedTodo)
    })
    .catch((error: any) => console.log(error))
});

//Delete a todo
todosRouter.delete('/:id', (request: Request, response: Response) => {
  Todo.findByIdAndRemove(request.params.id)
    .then((todo: any) => { //Should I send back the deleted todo?!
      response.status(204);
    })
    .catch((error: any) => console.log(error))
});

//Update a todo;

module.exports = todosRouter;