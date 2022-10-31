import styles from './ListItem.module.css';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';

import todoService from '../../services/todos';
import helpers from '../../utils/helpers';

function ListItem(props) {
  const item = props.item;
  const itemID = item.id;
  const setTodos = props.setTodos;

  async function deleteTodoHandler() {
    await todoService.deleteTodo(itemID);
    setTodos(prevTodos => {
      return prevTodos.filter(todo => todo.id != itemID);
    });
  };

  async function checkTodoHandler() {
    let updatedItem;
    if (item.done) {
      updatedItem = await todoService.uncheckTodo(itemID);
    } else {
      updatedItem = await todoService.checkTodo(itemID);
    }
    updatedItem = updatedItem.data;
    setTodos(prevTodos => {
      return helpers.sortTodos(prevTodos.map(todo => todo.id === itemID ? updatedItem : todo));
    });
  }

  return (
    <li>
      <Checkbox size='large' checked={item.done ? true : false} color='default' onClick={checkTodoHandler}/>
      <p className={`${styles.itemName} ${item.done ? styles.doneParagraph : ''}`} style={{ textDecoration: item.done ? 'line-through' : '' }}>{item.name}</p>
      <div className={styles.iconContainer} >
        <a><DeleteIcon onClick={deleteTodoHandler} sx={{ cursor: 'pointer' }} /></a>
      </div>
    </li>
  )
}

export default ListItem