import React, { useRef } from 'react';

const TodoFilters = ({ todos, setTodos, setFilterType }) => {
  //refs
  const listRef = useRef(null);
  //toggling color
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
    <div className="todo__filters">
      <span className="todo__items__left">{todos.length} items left</span>
      <ul
        className="filters"
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
      <span className="clear__todo" onClick={clearCompleted}>
        Clear completed
      </span>
    </div>
  );
};

export default TodoFilters;
