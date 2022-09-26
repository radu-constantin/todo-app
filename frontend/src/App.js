import './App.css';

import TodoList from './components/todo/TodoList';
import Navbar from './components/nav/NavBar';
import TodoForm from './components/todo/TodoForm';

function App() {
  const DUMMY_DATA = [
    {
      id: 1,
      name: "Clean car",
      done: false,
    },
    {
      id: 2,
      name: "Study",
      done: false,
    },
    {
      id: 3,
      name: "Feed the cat",
      done: true,
    },
    {
      id: 4,
      name: "Longer text for testing.",
      done: false,
    }
  ]

  return (
    <div>
      <Navbar />
      <TodoForm />
      <TodoList data={DUMMY_DATA}/>
    </div>
  );
}

export default App;
