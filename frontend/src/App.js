import './App.css';
import {useState, useEffect} from 'react';

import TodoList from './components/todo/TodoList';
import Navbar from './components/nav/NavBar';
import TodoForm from './components/todo/TodoForm';

import todoService from './services/todos';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    todoService.getAll().then(response => {
      setTodos(response.data);
    })
  }, []);

  function addTodo(todo) {
    const todoObj = {
      name: todo,
    }
    todoService.create(todoObj).then(newTodo => {
      setTodos(prevTodos => {
        return [newTodo, ...prevTodos];
      })
    })
  };

  function deleteTodoHandler(id) {
    todoService.deleteTodo(id);
    setTodos(prevTodos => {
      return prevTodos.filter(todo => todo.id != id);
    });
  };

  function checkTodoHandler(id) {
    todoService.checkTodo(id);
    setTodos(prevTodos => {
      return prevTodos.filter(todo => todo.id != id);
    });
  };

  return (
    <div>
      <Navbar />
      <TodoForm addTodo={addTodo}/>
      <TodoList data={todos} onDelete={deleteTodoHandler} onCheck={checkTodoHandler}/>
    </div>
  );
}

export default App;
