//importing react library and uuidv4 (random id's)
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
// Search bar component
const TodoSearchBar = ({
  user,
  setUser,
  todos,
  setTodos,
  lightMode,
  setLightMode,
}) => {
  //toggling between light Mode and Dark Mode
  const toggleModeHandler = () => {
    setLightMode(!lightMode);
  };
  //user adds todo
  const onFormSubmit = event => {
    //preventing default behavior
    event.preventDefault();
    if (user) {
      setTodos([
        ...todos,
        {
          title: user,
          isCompleted: false,
          id: uuidv4(),
        },
      ]);
      //clear search bar when users adds todo
      setUser('');
    }
  };
  //returing jsx
  return (
    <section>
      <header className="todo__app__header">
        <h1 className="title">Todo</h1>
        <div className="icon__container">
          <img
            src={
              lightMode === false
                ? './images/icon-sun.svg'
                : './images/icon-moon.svg'
            }
            alt="sun-icon"
            onClick={toggleModeHandler}
          />
        </div>
      </header>
      <form onSubmit={e => onFormSubmit(e)}>
        <input
          type="text"
          className={`todo__search__bar ${
            lightMode === true ? 'white__search__bar' : ''
          }`}
          placeholder="What's going on today ?"
          onChange={e => setUser(e.target.value)}
          value={user}
        />
      </form>
    </section>
  );
};

export default TodoSearchBar;
