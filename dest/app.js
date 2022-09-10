"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const todosRouter = require('./controllers/todos');
mongoose.connect('mongodb+srv://radu:$leipnir8O@cluster0.xckvvpi.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
    console.log('Connected to DB');
})
    .catch((error) => {
    console.log('Could not connect to MongoDB: ', error.message);
});
app.use(cors());
app.use(express.json());
app.use('/api/todos', todosRouter);
module.exports = app;
