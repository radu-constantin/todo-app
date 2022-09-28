import { Request, Response } from "express";

const Todo = require('../models/todos');

const todosRouter = require('express').Router();

//Get all todos
todosRouter.get('/', (request: Request, response: Response) => {
  Todo.find({}).then((todos: object) => {
    response.status(200).json(todos);
  })
  .catch((error: any) => {
    console.log(`Error: ${error}`);
  })
});

//Get specific todo by id
todosRouter.get('/:id', (request: Request, response: Response) => {
  Todo.findById(request.params.id).then((todo: object) => {
    if (todo) {
      response.status(200).json(todo);
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
    done: body.done
  });

  todo.save()
    .then((savedTodo: object) => {
      response.status(201).json(savedTodo)
    })
    .catch((error: any) =>{
      response.status(400).end();
    })
});

//Delete a todo
todosRouter.delete('/:id', (request: Request, response: Response) => {
  Todo.findByIdAndRemove(request.params.id)
    .then((todo: any) => { //Should I send back the deleted todo?!
      response.status(204).end();
    })
    .catch((error: any) => {
      response.status(404).end();
    })
});

//Update a todo;
todosRouter.put('/:id', (request: Request, response: Response) => {
  const body = request.body;

  const todo = {
    name: body.name,
    details: body.details,
    done: body.done
  }

  Todo.findByIdAndUpdate(request.params.id, todo, {new: true}).then((updatedTodo: object) => {
      response.status(200).json(updatedTodo)
    })
    .catch((error: any) => {
      response.status(404).end();
    });
})

module.exports = todosRouter;