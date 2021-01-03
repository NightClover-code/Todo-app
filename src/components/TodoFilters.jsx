//importing react library
import React, { useRef } from 'react';
//filters component
const TodoFilters = ({ todos, setTodos, setFilterType, lightMode }) => {
  //refs
  const listRef = useRef(null);
  //toggling filter items color
  const toggleColor = event => {
    Array.from(listRef.current.children).forEach(item => {
      item.classList.remove('blue__text');
    });
    if (event.target.tagName === 'LI') {
      event.target.classList.add('blue__text');
    }
  };
  //updtating filter type state
  const updateFilterType = event => {
    setFilterType(event.target.id);
  };
  //clearing completed todos
  const clearCompleted = () => {
    setTodos(todos.filter(someTodo => someTodo.isCompleted === false));
  };
  return (
    <div
      className={`todo__filters ${
        lightMode === true ? 'white__filters__list' : ''
      }`}
    >
      <span className="todo__items__left">{todos.length} items left</span>
      <ul
        className={`filters ${
          lightMode === true ? 'white__filters__hover' : ''
        }`}
        ref={listRef}
        onClick={e => {
          updateFilterType(e);
          toggleColor(e);
        }}
      >
        <li className="blue__text" id="all">
          All
        </li>
        <li id="active">Active</li>
        <li id="completed">Completed</li>
      </ul>
      <span
        className={`clear__todo ${
          lightMode === true ? 'white__span__hover' : ''
        }`}
        onClick={clearCompleted}
      >
        Clear completed
      </span>
    </div>
  );
};

export default TodoFilters;
