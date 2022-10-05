import styles from './ListItem.module.css';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';

function ListItem(props) {
  const item = props.item;

  function deleteTodo(event) {
    event.preventDefault();
    props.onDelete(item.id);
  }

  function checkHandler(event) {
    props.onCheck(item.id);
  }; 

  return (
    <li>
      <Checkbox size='large' onChange={checkHandler} checked={item.done ? true : false} color='default' />
      <p className={`${styles.itemName} ${item.done ? styles.doneParagraph : ''}`} style={{textDecoration: item.done ? 'line-through' : ''}}>{item.name}</p>
      <div className={styles.iconContainer} >
        <a><DeleteIcon onClick={deleteTodo} sx={{ cursor: 'pointer' }} /></a>
      </div>
    </li>
  )
}

export default ListItem