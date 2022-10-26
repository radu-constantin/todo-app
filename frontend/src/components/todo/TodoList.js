import styles from './TodoList.module.css'

import ListItem from './ListItem';

function TodoList({data, setTodos}) {
  // const todos = props.data;

  return (
    <div className={styles.todoList}>
      {data.map(todo => <ListItem key={todo.id} item={todo} setTodos={setTodos}/>)}
    </div>
  )
}

export default TodoList;