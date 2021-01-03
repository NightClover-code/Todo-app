import React, { useState, useRef } from 'react';
import TodoFilters from './TodoFilters';
import TodoListItem from './TodoListItem';

const TodoList = ({ todos, setTodos, filterType, setFilterType }) => {
  const returnedTodos = todos.map(todo => {
    return (
      <TodoListItem
        todo={todo}
        key={todo.id}
        id={todo.id}
        todos={todos}
        setTodos={setTodos}
        filterType={filterType}
      />
    );
  });
  return (
    <div className="todo__list">
      {returnedTodos}
      <TodoFilters
        todos={todos}
        setFilterType={setFilterType}
        setTodos={setTodos}
      />
    </div>
  );
};

export default TodoList;
