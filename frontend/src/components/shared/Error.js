import styles from './Error.module.css';

import { Alert } from '@mui/material';
import { AlertTitle } from '@mui/material';

function Error({ message }) {
  return (
    <div className={`${message ? styles.visible : styles.hidden}`}>
      <Alert severity="error">{message}</Alert>
    </div>
  )
}

export default Error;