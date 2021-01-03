//importing react library
import React, { useRef } from 'react';
//importing filters component
import TodoFilters from './TodoFilters';
//filters component
const TodoFiltersContainer = ({
  todos,
  setTodos,
  lightMode,
  toggleColor,
  updateFilterType,
}) => {
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
      <TodoFilters
        lightMode={lightMode}
        toggleColor={toggleColor}
        updateFilterType={updateFilterType}
      />
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

export default TodoFiltersContainer;
