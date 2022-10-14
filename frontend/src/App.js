import { useState, useEffect } from 'react';

import TodoList from './components/todo/TodoList';
import Navbar from './components/nav/NavBar';
import TodoForm from './components/todo/TodoForm';
import Login from './components/login/Login';
import Error from './components/shared/Error';
import Register from './components/registration/Register';

import styles from './App.module.css'

import { CircularProgress } from '@mui/material';

import todoService from './services/todos';
import loginService from './services/login';
import signupService from './services/signup';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    setLoading(true);
    todoService.getAll().then(response => {
      setTodos(response.data.sort(sortByStatus));
      setLoading(false);
    })
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      todoService.setToken(user.token);
    }
  }, []);

  function logout(event) {
    event.preventDefault();
    window.localStorage.removeItem('loggedUser');
    setUser(null);
    todoService.setToken(null);
  };

  function handleAlert(errorObj) {
    setErrorMessage(errorObj);
    console.log(errorObj); //delete later
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000);
  };

  function sortByStatus(a, b) {
    if (a.done && !b.done) {
      return 1;
    } else if (!a.done && b.done) {
      return -1;
    } else {
      return 0;
    }
  };

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
    <>
      <Navbar onLogout={logout} />
      <main>
        <Error message={errorMessage} />
        <Register onSignup={signupService.registerUser} />
        {/* {!user ? <Login onLogin={loginService.login} setUser={setUser} onError={handleAlert} /> :
          <>
            <TodoForm addTodo={addTodo} />
            {loading && <div className={styles.loaderContainer}> <CircularProgress />  </div>}
            <TodoList data={todos} onDelete={deleteTodoHandler} onCheck={checkTodoHandler} />
          </>} */}
      </main>
    </>
  );
}

export default App;
