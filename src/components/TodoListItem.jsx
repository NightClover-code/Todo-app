//importing react library
import React, { useRef, useEffect } from 'react';
//list Item component
const TodoListItem = ({ todo, todos, setTodos, filterType, id }) => {
  //refs
  const circleRef = useRef(null);
  const checkIconRef = useRef(null);
  const todoTextRef = useRef(null);
  const todoListItem = useRef(null);
  //checking filter type (active/completed/all)
  useEffect(() => {
    switch (filterType) {
      case 'completed':
        //making uncompleted items invisible
        todos.map(someTodo => {
          if (
            someTodo.isCompleted === false &&
            someTodo.id === todoListItem.current.getAttribute('id')
          ) {
            todoListItem.current.classList.add('invisible');
          }
          return someTodo;
        });
        break;
      case 'active':
        //making completed items invisible
        todoListItem.current.classList.remove('invisible');
        todos.map(someTodo => {
          if (
            someTodo.isCompleted === true &&
            someTodo.id === todoListItem.current.getAttribute('id')
          ) {
            todoListItem.current.classList.add('invisible');
          }
          return someTodo;
        });
        break;
      default:
        //all items should be visible (all filter)
        todoListItem.current.classList.remove('invisible');
        break;
    }
  }, [filterType, todos]);
  //deleting todos
  const onCrossIconClick = () => {
    setTodos(todos.filter(someTodo => someTodo !== todo));
  };
  //checking completed todos
  const onCheckCircleClick = () => {
    circleRef.current.classList.toggle('completed');
    setTodos(
      todos.map(someTodo => {
        if (someTodo.id === todo.id) {
          return {
            ...someTodo,
            isCompleted: !someTodo.isCompleted,
          };
        }
        return someTodo;
      })
    );
    markAsComplete();
  };
  //mark as complete ui
  const markAsComplete = () => {
    checkIconRef.current.style.visibility =
      todo.isCompleted === false ? 'visible' : 'hidden';
    todoTextRef.current.classList.toggle('cross__text');
  };
  return (
    <div className="todo__list__item" ref={todoListItem} id={id}>
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
