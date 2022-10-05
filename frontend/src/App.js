import { useState, useEffect } from 'react';

import TodoList from './components/todo/TodoList';
import Navbar from './components/nav/NavBar';
import TodoForm from './components/todo/TodoForm';

import styles from './App.module.css'

import { CircularProgress } from '@mui/material';

import todoService from './services/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    todoService.getAll().then(response => {
      setTodos(response.data.sort(sortByStatus));
      setLoading(false);
    })
  }, []);

  function sortByStatus(a, b) {
    if (a.done && !b.done) {
      return 1;
    } else if (!a.done && b.done) {
      return -1;
    } else {
      return 0;
    }
  }

  async function addTodo(todo) {
    setLoading(true);
    const todoObj = {
      name: todo,
    }

    let newTodo = await todoService.create(todoObj);
    
    setTodos(prevTodos => {
      return [newTodo, ...prevTodos];
    })

    setLoading(false);
  };

  async function deleteTodoHandler(id) {
    setLoading(true);
    await todoService.deleteTodo(id);
    setTodos(prevTodos => {
      return prevTodos.filter(todo => todo.id != id);
    });
    setLoading(false);
  };

  async function checkTodoHandler(id) {
    const selectedTodo = todos.filter(todo => todo.id === id)[0];
    let updatedTodo;

    if (selectedTodo.done) {
      updatedTodo = await todoService.uncheckTodo(id);
    } else {
      updatedTodo = await todoService.checkTodo(id);
    }

    updatedTodo = updatedTodo.data;

    setTodos(prevTodos => {
      let sortedTodos = prevTodos.map(todo => todo.id === id ? updatedTodo : todo).sort(sortByStatus);
      return sortedTodos;
    });
  };

  return (
    <div>
      <Navbar />
      <TodoForm addTodo={addTodo} />
      {loading && <div className={styles.loaderContainer}> <CircularProgress />  </div>}
      <TodoList data={todos} onDelete={deleteTodoHandler} onCheck={checkTodoHandler} />
    </div>
  );
}

export default App;
