import { useState } from 'react';

import styles from './TodoForm.module.css';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';

function TodoForm({ addTodo }) {
  const [newTodo, setNewTodo] = useState('');

  function handleTodoInput(event) {
    setNewTodo(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    addTodo(newTodo);
    setNewTodo('');
  }

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit}>
        <div className={styles.formItem}>
          <TextField required fullWidth label='Enter a new todo' type='text' name='name' id='name' onChange={handleTodoInput} value={newTodo} />
        </div>
        <div className={styles.buttonContainer}>
          <Button type='submit' variant='contained'>Save todo</Button>
        </div>
      </form>
    </div>
  )
}

export default TodoForm;