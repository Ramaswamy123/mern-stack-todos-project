import React, { useState, useEffect } from "react";
import axios from "axios";
import './index.css'

function Todos() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [message,setMessage] = useState(false)

  useEffect(() => {
    fetchTodos();
    console.log("calling")
  }, [todos.length]);

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
    if(newTodo === ""){
        setMessage(true)
    }
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
      await axios.put(`http://localhost:8081/todos/${id}`, {
        status: newStatus,
      });
      const updatedTodos = todos.map((todo) =>
        todo.task_id === id ? { ...todo, status: newStatus } : todo
      );
      setTodos(updatedTodos);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/todos/${id}`);
      const filteredTodos = todos.filter((todo) => todo.task_id !== id);
      setTodos(filteredTodos);
    } catch (error) { 
      console.error(error);
    }
  };
  return (
    <div className="app-container">
      <h1 className="todo-heading">TODO APP</h1>
      <div className="todo-input-container">
        <input
          className="todo-input"
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />

        <button className="add-button" onClick={addTodo}>ADD</button>
      </div>
      {message && <p className="message">Task field Should not be empty</p>}
      <ul className="todos-list-container">
        {todos.map((todo) => (
          <li className="todo-item" key={todo.task_id}>
            <h4 className="item-heading">{todo.task_name}</h4>
            <div>
            <select className="select">
                <option className="options" value="pending" onChange={() => updateTodoStatus(todo.task_id, "pending")}>Pending</option>
                <option className="options" value="in progress" onChange={() => updateTodoStatus(todo.task_id, "in progress")}>in progress</option>
                <option className="options" value="completed" onChange={() => updateTodoStatus(todo.task_id, "completed")}>completed</option>
                <option className="options" value="done" onChange={() => updateTodoStatus(todo.task_id, "done")}>done</option>
            </select>
            </div>
            <div className="delete-box">
            <button className="delete-button" onClick={() => deleteTodo(todo.task_id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todos;
