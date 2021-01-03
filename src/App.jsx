import './css/app.css';

import React, { useEffect, useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

import TodoList from './components/TodoList';
import TodoSearchBar from './components/TodoSearchBar';

const defaultTodos = [
  { title: 'Take out the trash', isCompleted: false, id: uuidv4() },
  { title: 'Read for 1 hour', isCompleted: false, id: uuidv4() },
  { title: 'Wash the dishes', isCompleted: false, id: uuidv4() },
];
const App = () => {
  //state
  const [user, setUser] = useState('');
  const [todos, setTodos] = useState(defaultTodos);
  const [filterType, setFilterType] = useState('all');
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
