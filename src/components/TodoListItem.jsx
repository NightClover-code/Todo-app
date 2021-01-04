//importing react library
import React, { useRef, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
//list Item component
const TodoListItem = ({
  todo,
  todos,
  setTodos,
  filterType,
  id,
  lightMode,
  index,
  moveTodo,
}) => {
  //refs
  const circleRef = useRef(null);
  const checkIconRef = useRef(null);
  const todoTextRef = useRef(null);
  const todoListItem = useRef(null);
  //useEffect
  useEffect(() => {
    todoTextRef.current.classList.remove('cross__text__dark');
    todoTextRef.current.classList.remove('cross__text__light');
    checkIconRef.current.style.visibility = 'hidden';
    setTodos(
      todos.map(someTodo => {
        return {
          ...someTodo,
          isCompleted: false,
        };
      })
    );
  }, [lightMode]);
  //drag and drop funtionnality
  const [, drop] = useDrop({
    accept: 'card',
    hover(item, monitor) {
      if (!todoListItem.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = todoListItem.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveTodo(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    item: { type: 'card', id, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(todoListItem));
  //checking filter type (active/completed/all)
  useEffect(() => {
    switch (filterType) {
      case 'completed':
        //making uncompleted items invisible
        todoListItem.current.classList.remove('invisible');
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
    if (lightMode) {
      circleRef.current.classList.toggle('white__circle');
    }
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
    lightMode === true
      ? todoTextRef.current.classList.toggle('cross__text__light')
      : todoTextRef.current.classList.toggle('cross__text__dark');
  };
  return (
    <div
      className={`todo__list__item ${
        lightMode === true ? 'white__list__item' : ''
      } `}
      style={{ opacity }}
      draggable="true"
      ref={todoListItem}
      id={id}
    >
      <div className="todo__item__left">
        <div
          className={`check__circle__container ${
            lightMode === true ? 'light__circle__border' : ''
          }`}
          onClick={onCheckCircleClick}
        >
          <div
            className={`check__circle ${
              lightMode === true ? 'white__circle' : ''
            }`}
            ref={circleRef}
          >
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
