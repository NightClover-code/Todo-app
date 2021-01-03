//importing styles
import './css/app.css';
//importing react library and uuidv4 (random id's)
import React, { useEffect, useState, useRef } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
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
  //refs
  const appRef = useRef(null);
  //state
  const [lightMode, setLightMode] = useState(false);
  const [user, setUser] = useState('');
  const [todos, setTodos] = useState([]);
  const [filterType, setFilterType] = useState('all');
  //changing background based upon background mode
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
    <div
      className={`app__container ${
        lightMode === true ? 'light__background' : 'dark__background'
      }`}
      ref={appRef}
    >
      <DndProvider backend={HTML5Backend}>
        <div className="wrapper">
          <TodoSearchBar
            user={user}
            setUser={setUser}
            todos={todos}
            setTodos={setTodos}
            lightMode={lightMode}
            setLightMode={setLightMode}
          />
          <TodoList
            todos={todos}
            setTodos={setTodos}
            filterType={filterType}
            setFilterType={setFilterType}
            lightMode={lightMode}
          />
          <footer>
            <p className={lightMode === true ? 'white__footer__text' : ''}>
              Drag and drop to reorder list
            </p>
          </footer>
        </div>
      </DndProvider>
    </div>
  );
};
export default App;
