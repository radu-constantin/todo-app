import styles from './TodoList.module.css'

import ListItem from './ListItem';

function TodoList({data, setTodos}) {
  return (
    <div className={styles.todoList}>
      {data.length > 0 ? data.map(todo => <ListItem key={todo.id} item={todo} setTodos={setTodos}/>) : <p className={styles.paragraph}>THERE ARE CURRENTLY NO TODO'S</p>}
    </div>
  )
}

export default TodoList;