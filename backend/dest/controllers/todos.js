"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Todo = require('../models/todos');
const todosRouter = require('express').Router();
//Get all todos
todosRouter.get('/', (request, response) => {
    Todo.find({}).then((todos) => {
        response.status(200).json(todos);
    })
        .catch((error) => {
        console.log(`Error: ${error}`);
    });
});
//Get specific todo by id
todosRouter.get('/:id', (request, response) => {
    Todo.findById(request.params.id).then((todo) => {
        if (todo) {
            response.status(200).json(todo);
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
        response.status(201).json(savedTodo);
    })
        .catch((error) => {
        response.status(400).end();
    });
});
//Delete a todo
todosRouter.delete('/:id', (request, response) => {
    Todo.findByIdAndRemove(request.params.id)
        .then((todo) => {
        response.status(204).end();
    })
        .catch((error) => {
        response.status(404).end();
    });
});
//Update a todo;
todosRouter.put('/:id', (request, response) => {
    const body = request.body;
    const todo = {
        name: body.name,
        details: body.details
    };
    Todo.findByIdAndUpdate(request.params.id, todo, { new: true }).then((updatedTodo) => {
        response.status(200).json(updatedTodo);
    })
        .catch((error) => {
        response.status(404).end();
    });
});
module.exports = todosRouter;
