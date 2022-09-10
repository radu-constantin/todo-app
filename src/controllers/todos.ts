import { Request, Response } from "express";

const Todo = require('../models/todos');

const todosRouter = require('express').Router();

todosRouter.get('/', (request: Request, response: Response) => {
  Todo.find({}).then((todos: object) => {
    response.json(todos);
  })
  .catch((error: any) => {
    error.log(`Error: ${error}`);
  })
})

module.exports = todosRouter;