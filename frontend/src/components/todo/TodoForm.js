import styles from './TodoForm.module.css';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';

function TodoForm() {
  return (
    <div className={styles.formContainer}>
      <form>
        <div className={styles.formItem}>
          <TextField required fullWidth label='Enter a new todo' type='text' name='name' id='name' />
        </div>
        <div className={styles.buttonContainer}>
          <Button variant='contained'>Save todo</Button>
        </div>
      </form>
    </div>
  )
}

export default TodoForm;