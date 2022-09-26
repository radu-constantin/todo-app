import styles from './ListItem.module.css';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';

function ListItem(props) {
  const item = props.item;
  return (
    <li>
      <Checkbox size='large' />
      <p className={styles.itemName}>{item.name}</p>
      <div className={styles.iconContainer}><DeleteIcon /></div>
    </li>
  )
}

export default ListItem