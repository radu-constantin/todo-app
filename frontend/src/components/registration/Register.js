import styles from './Register.module.css';
import { useState } from 'react';

import { TextField } from '@mui/material';
import { Button } from '@mui/material';

function Register({ onSignup }) {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function registerUser(event) {
    event.preventDefault();
    onSignup({ username, name, email, password });
  }

  return (
    <div className={styles.formContainer}>
      <form onSubmit={registerUser}>
        <div className={styles.formItem}>
          <TextField required fullWidth label='Username' type='text' name='username' id='username' value={username} onChange={({ target }) => setUsername(target.value)}/>
        </div>
        <div className={styles.formItem}>
          <TextField required fullWidth label='Name' type='text' name='name' id='name' value={name} onChange={({ target }) => setName(target.value)}/>
        </div>
        <div className={styles.formItem}>
          <TextField required fullWidth label='E-mail' type='text' name='email' id='email' value={email} onChange={({ target }) => setEmail(target.value)}/>
        </div>
        <div className={styles.formItem}>
          <TextField required fullWidth label='Password' type='password' name='password' id='password' value={password} onChange={({ target }) => setPassword(target.value)}/>
        </div>
        <div className={styles.buttonContainer}>
          <Button type='submit' variant='contained'>Sign up</Button>
        </div>
      </form>
    </div>
  )
}

export default Register;