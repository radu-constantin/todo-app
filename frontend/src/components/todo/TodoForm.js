import { useState } from 'react';

import styles from './TodoForm.module.css';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';

import todoService from '../../services/todos';

function TodoForm({ setTodos, setIsLoading }) {
  const [newTodo, setNewTodo] = useState('');

  async function addTodo(todo) {
    setIsLoading(true);
    const todoObj = {
      name: todo,
    };

    let newTodo = await todoService.create(todoObj);

    setTodos(prevTodos => {
      return [newTodo, ...prevTodos];
    })

    setIsLoading(false);
  };

  function inputHandler(event) {
    setNewTodo(event.target.value);
  }

  function submitHandler(event) {
    event.preventDefault();
    addTodo(newTodo);
    setNewTodo('');
  }

  return (
    <div className={styles.formContainer}>
      <form onSubmit={submitHandler}>
        <div className={styles.formItem}>
          <TextField required fullWidth label='Enter a new todo' type='text' name='name' id='name' onChange={inputHandler} value={newTodo} />
        </div>
        <div className={styles.buttonContainer}>
          <Button type='submit' variant='contained'>Save todo</Button>
        </div>
      </form>
    </div>
  )
}

export default TodoForm;