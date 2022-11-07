import { useState, useEffect } from 'react';

import Main from './components/main/Main';
import Navbar from './components/nav/NavBar';
import Login from './components/login/Login';
import Message from './components/shared/Message';
import Wrapper from './components/shared/Wrapper';
import Register from './components/registration/Register';

import styles from './App.module.css'

import { CircularProgress } from '@mui/material';

function App() {
  function getToken() {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken;
  }

  function setToken(userToken) {
    sessionStorage.setItem('token', JSON.stringify(userToken));
    setLoggedUser(getToken());
  }

  function handleLogout() {
    sessionStorage.removeItem('token');
    setLoggedUser(null);
  }

  function setAndDisplayMessage(messageObj) {
    setMessage(messageObj);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  }

  const [loggedUser, setLoggedUser] = useState(getToken());
  const [message, setMessage] = useState(null);

  return (
    <>
      <Navbar onLogout={handleLogout} />
      <Wrapper>
        {message && <Message text={message.text} status={message.status} />}
        {loggedUser ? <Main getToken={getToken} userName={loggedUser.username} /> : <Login setLoggedUser={setToken} setMessage={setAndDisplayMessage} />}
      </Wrapper>
    </>
  );
}

export default App;


// const [todos, setTodos] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [user, setUser] = useState(null);
//   const [errorMessage, setErrorMessage] = useState(null);

//   useEffect(() => {
//     setLoading(true);
//     todoService.getAll().then(response => {
//       setTodos(response.data.sort(sortByStatus));
//       setLoading(false);
//     })
//   }, []);

//   function handleAlert(errorObj) {
//     setErrorMessage(errorObj);
//     console.log(errorObj); //delete later
//     setTimeout(() => {
//       setErrorMessage(null)
//     }, 5000);
//   };

//   function sortByStatus(a, b) {
//     if (a.done && !b.done) {
//       return 1;
//     } else if (!a.done && b.done) {
//       return -1;
//     } else {
//       return 0;
//     }
//   };

//   async function addTodoHandler(todo) {
//     setLoading(true);
//     const todoObj = {
//       name: todo,
//     }

//     let newTodo = await todoService.create(todoObj);

//     setTodos(prevTodos => {
//       return [newTodo, ...prevTodos];
//     })

//     setLoading(false);
//   };

//   async function deleteTodoHandler(id) {
//     setLoading(true);
//     await todoService.deleteTodo(id);
//     setTodos(prevTodos => {
//       return prevTodos.filter(todo => todo.id != id);
//     });
//     setLoading(false);
//   };

//   async function checkTodoHandler(id) {
//     const selectedTodo = todos.filter(todo => todo.id === id)[0];
//     let updatedTodo;

//     if (selectedTodo.done) {
//       updatedTodo = await todoService.uncheckTodo(id);
//     } else {
//       updatedTodo = await todoService.checkTodo(id);
//     }

//     updatedTodo = updatedTodo.data;

//     setTodos(prevTodos => {
//       let sortedTodos = prevTodos.map(todo => todo.id === id ? updatedTodo : todo).sort(sortByStatus);
//       return sortedTodos;
//     });
//   };

//   return (
//     <>
//       <Navbar />
//       <main>
//           <Error message={errorMessage} />
//           <TodoForm addTodo={addTodoHandler} />
//           {loading && <div className={styles.loaderContainer}> <CircularProgress />  </div>}
//           <TodoList data={todos} onDelete={deleteTodoHandler} onCheck={checkTodoHandler} />
//       </main>
//     </>
//   );