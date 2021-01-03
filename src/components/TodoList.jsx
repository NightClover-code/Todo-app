//importing react library
import React from 'react';
//importing components
import TodoFilters from './TodoFilters';
import TodoListItem from './TodoListItem';
//list component
const TodoList = ({ todos, setTodos, filterType, setFilterType }) => {
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
      />
    );
  });
  //returning todo list
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
