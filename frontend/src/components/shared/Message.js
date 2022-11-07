import styles from './Message.module.css';

import { Alert } from '@mui/material';

function Message ({ text, status }) {
  return (
    <div className={`${styles.messageBox} ${text ? styles.visible : styles.hidden}`}>
      <Alert className={styles.alert} severity={status}>{text}</Alert>
    </div>
  )
}

export default Message;