import React from "react";

const ToDoList = ({ todos, updateToDo, updateCallback }) => {
  const onDelete = async (id) => {
    const options = {
      method: "DELETE",
    };
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/delete_todo/${id}`,
        options
      );
      if (response.status === 200) {
        updateCallback();
      } else {
        console.error("Failed to delete!");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <h2>Todos</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>{todo.title}</td>
              <td>{todo.description}</td>
              <td>
                <button onClick={() => updateToDo(todo)}>Update</button>
                <button onClick={() => onDelete(todo.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ToDoList;
