import React, { useState } from "react";

import trash_icon from "./icons8-trash-64.png";

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
    <div className="todo-list-container">
      {todos.map((todo) => (
        <div className="todo-item-container" key={todo.id}>
          <div className="todo-item">
            {todo.title}
            <button className="delete-button" onClick={() => onDelete(todo.id)}>
              <img src={trash_icon} alt="trash icon" />
            </button>
          </div>
        </div>
      ))}
      {todos.length ? (
        <p className="todo-count">You have {todos.length} todos left 😄</p>
      ) : (
        <p className="none-todo">You have no todos!</p>
      )}
    </div>
  );
};

export default ToDoList;
