//importing react library
import React, { useCallback } from 'react';
//importing components
import TodoFiltersContainer from './TodoFiltersContainer';
import TodoListItem from './TodoListItem';
import update from 'immutability-helper';
//list component
const TodoList = ({
  todos,
  setTodos,
  filterType,
  setFilterType,
  lightMode,
  toggleColor,
  updateFilterType,
}) => {
  //drag function
  const moveTodo = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = todos[dragIndex];
      setTodos(
        update(todos, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        })
      );
    },
    [todos, setTodos]
  );
  //returning todo items
  const returnedTodos = todos.map((todo, index) => {
    return (
      <TodoListItem
        key={todo.id}
        todo={todo}
        id={todo.id}
        todos={todos}
        setTodos={setTodos}
        filterType={filterType}
        lightMode={lightMode}
        index={index}
        moveTodo={moveTodo}
      />
    );
  });
  //returning todo list
  return (
    <div className={`todo__list ${lightMode === true ? 'white__list' : ''}`}>
      {returnedTodos}
      <TodoFiltersContainer
        todos={todos}
        setFilterType={setFilterType}
        setTodos={setTodos}
        lightMode={lightMode}
        toggleColor={toggleColor}
        updateFilterType={updateFilterType}
      />
    </div>
  );
};

export default TodoList;
