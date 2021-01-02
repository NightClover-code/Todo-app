import React, { useState, useRef } from 'react';
import TodoFilters from './TodoFilters';
import TodoListItem from './TodoListItem';

const TodoList = ({
  todos,
  setTodos,
  filterType,
  setFilterType,
  filteredTodos,
  setFilteredTodos,
}) => {
  //refs
  const todoItemRef = useRef(null);
  const returnedTodos = filteredTodos.map(todo => {
    return (
      <TodoListItem
        todo={todo}
        key={todo.id}
        todos={todos}
        setTodos={setTodos}
        todoItemRef={todoItemRef}
        filterType={filterType}
        filteredTodos={filteredTodos}
        setFilteredTodos={setFilteredTodos}
      />
    );
  });
  return (
    <div className="todo__list">
      {returnedTodos}
      <TodoFilters
        todos={todos}
        setTodos={setTodos}
        todoItemRef={todoItemRef}
        filterType={filterType}
        setFilterType={setFilterType}
      />
    </div>
  );
};

export default TodoList;
