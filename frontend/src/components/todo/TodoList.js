import styles from './TodoList.module.css'

import ListItem from './ListItem';

function TodoList(props) {
  const todos = props.data;

  return (
    <div className={styles.todoList}>
      {todos.map(todo => <ListItem key={todo.id} item={todo} onDelete={props.onDelete} onCheck={props.onCheck}/>)}
    </div>
  )
}

export default TodoList;