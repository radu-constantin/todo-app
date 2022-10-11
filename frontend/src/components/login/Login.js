import { useState } from 'react';

import styles from "./Login.module.css";

import { TextField } from '@mui/material';
import { Button } from '@mui/material';

function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function loginHandler(event) {
    event.preventDefault() //Temporary
    try {
      const user = await props.onLogin({username, password});
      console.log(user);
      props.setUser(user);
      setUsername('');
      setPassword('');
    } catch(exception) {
      props.onError(exception.response.data.error);
    }
  }

  return (
    <div className={styles.formContainer}>
      <form onSubmit={loginHandler}>
        <div className={styles.formItem}>
          <TextField required fullWidth label='Username' type='text' name='username' id='username' value={username} onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div className={styles.formItem}>
          <TextField required fullWidth label='Password' type='password' name='password' id='password' value={password} onChange={({ target }) => setPassword(target.value)}/>
        </div>
        <div className={styles.buttonContainer}>
          <Button type='submit' variant='contained'>Login</Button>
        </div>
      </form>
    </div>
  )

}

export default Login;