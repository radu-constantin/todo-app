"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Todo = require('../models/todos');
const todosRouter = require('express').Router();
//Get all todos
todosRouter.get('/', (request, response) => {
    Todo.find({}).then((todos) => {
        response.json(todos);
    })
        .catch((error) => {
        console.log(`Error: ${error}`);
    });
});
//Get specific todo by id
todosRouter.get('/:id', (request, response) => {
    console.log(request.params.id);
    Todo.findById(request.params.id).then((todo) => {
        if (todo) {
            response.json(todo);
        }
        else {
            response.status(404).end();
        }
    })
        .catch((error) => {
        console.log(`Error: ${error}`);
    });
});
//Post a todo
todosRouter.post('/', (request, response) => {
    const body = request.body;
    const todo = new Todo({
        name: body.name,
        details: body.details,
    });
    todo.save()
        .then((savedTodo) => {
        response.json(savedTodo);
    })
        .catch((error) => console.log(error));
});
//Delete a todo
todosRouter.delete('/:id', (request, response) => {
    Todo.findByIdAndRemove(request.params.id)
        .then((todo) => {
        response.status(204);
    })
        .catch((error) => console.log(error));
});
//Update a todo;
module.exports = todosRouter;
