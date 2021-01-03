import React, { useRef } from 'react';

const TodoFilters = ({ lightMode, updateFilterType, toggleColor }) => {
  const listRef = useRef(null);
  return (
    <ul
      className={`filters ${lightMode === true ? 'white__filters__hover' : ''}`}
      ref={listRef}
      onClick={e => {
        updateFilterType(e, listRef);
        toggleColor(e, listRef);
      }}
    >
      <li className="blue__text" id="all">
        All
      </li>
      <li id="active">Active</li>
      <li id="completed">Completed</li>
    </ul>
  );
};

export default TodoFilters;
