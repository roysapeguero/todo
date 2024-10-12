import { useEffect, useState } from "react";
import "./App.css";
import ToDoList from "./ToDoList";
import ToDoForm from "./ToDoForm";

function App() {
  const [todos, setTodos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentToDo({});
  };

  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true);
  };

  const openEditModal = (todo) => {
    if (isModalOpen) return;
    setCurrentToDo(todo);
    setIsModalOpen(true);
  };

  const onUpdate = () => {
    closeModal();
    fetchTodos();
  };

  return (
    <>
      <ToDoList
        todos={todos}
        updateToDo={openEditModal}
        updateCallback={onUpdate}
      />
      <button onClick={openCreateModal}>Create New ToDo</button>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <ToDoForm existingToDo={currentToDo} updateCallback={onUpdate} />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
