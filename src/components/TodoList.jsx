//importing react library
import React from 'react';
//importing components
import TodoFilters from './TodoFilters';
import TodoListItem from './TodoListItem';
//list component
const TodoList = ({
  todos,
  setTodos,
  filterType,
  setFilterType,
  lightMode,
}) => {
  //returning todo items
  const returnedTodos = todos.map(todo => {
    return (
      <TodoListItem
        todo={todo}
        key={todo.id}
        id={todo.id}
        todos={todos}
        setTodos={setTodos}
        filterType={filterType}
        lightMode={lightMode}
      />
    );
  });
  //returning todo list
  return (
    <div className={`todo__list ${lightMode === true ? 'white__list' : ''}`}>
      {returnedTodos}
      <TodoFilters
        todos={todos}
        setFilterType={setFilterType}
        setTodos={setTodos}
        lightMode={lightMode}
      />
    </div>
  );
};

export default TodoList;
