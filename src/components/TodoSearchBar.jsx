import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const TodoSearchBar = ({ user, setUser, todos, setTodos }) => {
  //user adds todo
  const onFormSubmit = event => {
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
      setUser('');
    }
  };
  return (
    <section>
      <header className="todo__app__header">
        <h1 className="title">Todo</h1>
        <div className="icon__container">
          <img src="./images/icon-sun.svg" alt="sun-icon" />
        </div>
      </header>
      <form onSubmit={e => onFormSubmit(e)}>
        <input
          type="text"
          className="todo__search__bar"
          placeholder="What's going on today ?"
          onChange={e => setUser(e.target.value)}
          value={user}
        />
      </form>
    </section>
  );
};

export default TodoSearchBar;
