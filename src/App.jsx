//importing styles
import './css/app.css';
//importing react library and uuidv4 (random id's)
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
//importing components
import TodoList from './components/TodoList';
import TodoSearchBar from './components/TodoSearchBar';
//default todos
const defaultTodos = [
  { title: 'Take out the trash', isCompleted: false, id: uuidv4() },
  { title: 'Read for 1 hour', isCompleted: false, id: uuidv4() },
  { title: 'Wash the dishes', isCompleted: false, id: uuidv4() },
];
//App component
const App = () => {
  //state
  const [user, setUser] = useState('');
  const [todos, setTodos] = useState([]);
  const [filterType, setFilterType] = useState('all');
  //getting items from local storage
  const getLocalItems = () => {
    if (localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]));
    } else {
      let todosLocal = JSON.parse(localStorage.getItem('todos'));
      setTodos(todosLocal);
    }
  };
  //showing items located in local storage in first render
  useEffect(() => {
    setTodos(defaultTodos);
    getLocalItems();
  }, []);
  //saving items to local storage based on todos change
  useEffect(() => {
    const saveToLocal = () => {
      localStorage.setItem('todos', JSON.stringify(todos));
    };
    saveToLocal();
  }, [todos]);
  //returning jsx
  return (
    <div className="app__container">
      <div className="background"></div>
      <div className="wrapper">
        <TodoSearchBar
          user={user}
          setUser={setUser}
          todos={todos}
          setTodos={setTodos}
        />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          filterType={filterType}
          setFilterType={setFilterType}
        />
        <footer>
          <p>Drag and drop to reorder list</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
