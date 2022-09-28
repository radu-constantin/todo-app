import styles from './ListItem.module.css';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';

function ListItem(props) {
  const item = props.item;

  function deleteTodo(event) {
    event.preventDefault();
    props.onDelete(item.id);
  }

  function checkTodo(event) {
    setTimeout(() => {
      props.onCheck(item.id)
    }, 1000);
  };

  return (
    <li>
      <Checkbox size='large' onChange={checkTodo}/>
      <p className={styles.itemName}>{item.name}</p>
      <div className={styles.iconContainer} >
        <a><DeleteIcon onClick={deleteTodo} sx={{cursor: 'pointer'}}/></a>
        </div>
    </li>
  )
}

export default ListItem