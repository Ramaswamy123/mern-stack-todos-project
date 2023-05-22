import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:8081"; // Update with your backend API URL

function Todos() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:8081/todos");
      setTodos(response.data);
      console.log(response)
      
    } catch (error) {
      console.error(error);
    }
  };

  const addTodo = async () => {
    try {
      const response = await axios.post("http://localhost:8081/todos", {
        task_name: newTodo,
        task_status: "pending",
      });
      setTodos([...todos, response.data]);
      setNewTodo("");
    } catch (error) {
      console.error(error);
    }
  };

  const updateTodoStatus = async (id, newStatus) => {
    try {
      await axios.put(`${API_BASE_URL}/todos/${id}`, {
        status: newStatus,
      });
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, status: newStatus } : todo
      );
      setTodos(updatedTodos);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/todos/${id}`);
      const filteredTodos = todos.filter((todo) => todo.id !== id);
      setTodos(filteredTodos);
    } catch (error) { 
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Todo App</h1>
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span>{todo.title}</span>
            <button onClick={() => updateTodoStatus(todo.id, "done")}>
              Done
            </button>
            <button onClick={() => updateTodoStatus(todo.id, "pending")}>
              Pending
            </button>
            <button onClick={() => updateTodoStatus(todo.id, "in progress")}>
              In Progress
            </button>
            <button onClick={() => updateTodoStatus(todo.id, "completed")}>
              Completed
            </button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todos;
