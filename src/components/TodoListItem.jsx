import React, { useRef, useEffect } from 'react';

const TodoListItem = ({
  todo,
  todos,
  setTodos,
  todoItemRef,
  filterType,
  filteredTodos,
  setFilteredTodos,
}) => {
  //refs
  const circleRef = useRef(null);
  const checkIconRef = useRef(null);
  const todoTextRef = useRef(null);

  //filter Handler

  //use Effect
  useEffect(() => {
    switch (filterType) {
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.isCompleted === true));
        break;
      case 'active':
        setFilteredTodos(todos.filter(todo => todo.isCompleted === false));
        break;
      default:
        setFilteredTodos(todos);
    }
  }, [filterType, todos, setFilteredTodos]);

  //deleting todos
  const onCrossIconClick = () => {
    setTodos(todos.filter(someTodo => someTodo !== todo));
  };
  //checking completed todos
  const onCheckCircleClick = () => {
    circleRef.current.classList.toggle('completed');
    setTodos(
      todos.map(someTodo => {
        if (someTodo.title === todo.title) {
          return {
            ...someTodo,
            isCompleted: !todo.isCompleted,
          };
        }
        return someTodo;
      })
    );
    markAsComplete();
  };
  //mark as complete
  const markAsComplete = () => {
    checkIconRef.current.style.visibility =
      todo.isCompleted === false ? 'visible' : 'hidden';
    todoTextRef.current.classList.toggle('cross__text');
  };
  return (
    <div className="todo__list__item" ref={todoItemRef}>
      <div className="todo__item__left">
        <div className="check__circle__container" onClick={onCheckCircleClick}>
          <div className="check__circle" ref={circleRef}>
            <div className="check__circle__icon">
              <img
                src="./images/icon-check.svg"
                alt="check-icon"
                ref={checkIconRef}
              />
            </div>
          </div>
        </div>
        <p className="todo__text" ref={todoTextRef}>
          {todo.title}
        </p>
      </div>
      <div className="cross__icon__container" onClick={onCrossIconClick}>
        <img src="./images/icon-cross.svg" alt="cross-icon" />
      </div>
    </div>
  );
};

export default TodoListItem;
