import { useEffect, useState } from "react";
import "./App.css";
import ToDoList from "./ToDoList";
import ToDoForm from "./ToDoForm";

function App() {
  const [todos, setTodos] = useState([]);
  const [currentToDo, setCurrentToDo] = useState({});

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await fetch("http://127.0.0.1:5000/todos");
    const data = await response.json();
    setTodos(data.todos);
    console.log(data.todos);
  };

  const editToDo = (todo) => {
    setCurrentToDo(todo);
  };

  const onUpdate = () => {
    fetchTodos();
  };

  return (
    <div className="content-container">
      <ToDoForm existingToDo={currentToDo} updateCallback={onUpdate} />
      <h3>Todos: </h3>
      <ToDoList todos={todos} updateToDo={editToDo} updateCallback={onUpdate} />
    </div>
  );
}

export default App;
