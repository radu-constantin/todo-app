const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Todo = require('../models/todos');

const initialTodos = [
  {name: "Clean car"},
  {name: "Clean house", details: "random cleaning"},
  {name: "Fix lights"}
];

beforeEach(async() => {
  await Todo.deleteMany({});

  for (let i=0; i < initialTodos.length; i += 1) {
    let todoObj = new Todo(initialTodos[i]);
    await todoObj.save();
  }
});

describe("Gets all todos", () => {
  test("all todos are returned", async() => {
    const response = await api.get('/api/todos');
  
    expect(response.body).toHaveLength(initialTodos.length);
  });
});


describe("Gets a specific todo", () => {
  test("return a specific todo", async() => {
    const response = await api.get('/api/todos');
  
    const todo = response.body[0];
  
    const specificTodo = await api.get(`/api/todos/${todo.id}`);
    expect(specificTodo.body).toEqual(todo);
  });
  
  test("fails with status code 404 if todo is not found", async() => {
    await api.get(`/api/todos/63208c4995815d464da5b191`).expect(404);
  })
});

describe("Add new todos", () => {
  test("can save a todo via post request", async() => {
    const todo = {
      name: "test todo",
      details: "test"
    }
  
    await api.post('/api/todos').send(todo).expect(201);
  
    const response = await api.get('/api/todos');
    expect(response.body).toHaveLength(initialTodos.length + 1);
  });

  test("Fails with 400 if invalid todo", async() => {
    const todo = {
      details: "test"
    }
  
    await api.post('/api/todos').send(todo).expect(400);
  })
});

describe("Todo can be deleted", () => {
  test("can delete a todo", async() => {
    const response = await api.get('/api/todos');
    const id = response.body[0].id;
  
    await api.delete(`/api/todos/${id}`).expect(204);
  
    const updatedTodos = await api.get('/api/todos');
    expect(updatedTodos.body).toHaveLength(initialTodos.length - 1);
  });
});


test("can update a todo", async() => {
  const update = {
    name: 'Updated Todo'
  }

  const response = await api.get('/api/todos');
  const id = response.body[0].id;

  await api.put(`/api/todos/${id}`).send(update);

  const updatedTodo = await api.get(`/api/todos/${id}`);
  expect(updatedTodo.body.name).toBe("Updated Todo");
})

afterAll(() => {
  mongoose.connection.close();
});