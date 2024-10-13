import { useState } from "react";

const ToDoForm = ({ existingToDo = {}, updateCallback }) => {
  const [title, setTitle] = useState(existingToDo.title || "");

  const updating = Object.entries(existingToDo).length !== 0;

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title,
    };

    const url =
      "http://127.0.0.1:5000/" +
      (updating ? `update_todo/${existingToDo.id}` : "create_todo");
    const options = {
      method: updating ? "PATCH" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, options);
    if (response.status !== 201 && response.status !== 200) {
      const data = await response.json();
      alert(data.message);
    } else {
      updateCallback();
      setTitle("");
    }
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <h2>Todo App</h2>
      <div className="todo-create-form">
        <input
          className="todo-input"
          placeholder="Add your new todo"
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="todo-add-button" type="submit">
          +
        </button>
      </div>
    </form>
  );
};

export default ToDoForm;
