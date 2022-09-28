import styles from './TodoList.module.css'

import ListItem from './ListItem';

function TodoList(props) {
  return (
    <div className={styles.todoList}>
      {props.data.map(todo => <ListItem key={todo.id} item={todo} onDelete={props.onDelete} onCheck={props.onCheck}/>)}
    </div>
  )
}

export default TodoList;