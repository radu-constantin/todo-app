import todoService from '../../services/todos';
import helpers from '../../utils/helpers';
import TodoList from '../todo/TodoList';
import TodoForm from '../todo/TodoForm';

import styles from './Main.module.css';
import { CircularProgress } from '@mui/material';

import { useEffect, useState } from 'react';

function Main(props) {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await todoService.getAll('odin');
      const todos = helpers.sortTodos(response.data);
      setTodos(todos);
      setIsLoading(false);
    })();

  }, []);

  return (
    <main>
      <TodoForm setTodos={setTodos} setIsLoading={setIsLoading} getToken={props.getToken}/>
      {isLoading && <div className={styles.loaderContainer}><CircularProgress /></div>}
      <TodoList data={todos} setTodos={setTodos} />
    </main>
  )
};

export default Main;
