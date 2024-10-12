import { useState } from "react";

const ToDoForm = ({ existingToDo = {}, updateCallback }) => {
  const [title, setTitle] = useState(existingToDo.title || "");
  const [description, setDescription] = useState(
    existingToDo.description || ""
  );

  const updating = Object.entries(existingToDo).length !== 0;

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title,
      description,
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
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type="submit">{updating ? "Update" : "Create"}</button>
    </form>
  );
};

export default ToDoForm;
