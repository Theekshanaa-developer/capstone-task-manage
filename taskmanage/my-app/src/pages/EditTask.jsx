import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/EditTask.css";

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "TODO",
  });
  const [loading, setLoading] = useState(true);

  // Fetch task
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/tasks/${id}`)
      .then((response) => {
        const data = response.data.data || response.data;
        setTask({
          title: data.title || "",
          description: data.description || "",
          status: data.status || "TODO",
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching task:", error);
        setLoading(false);
      });
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/tasks/${id}`, task, {
        headers: { "Content-Type": "application/json" },
      });

      // Navigate to dashboard and send a message via state
      navigate("/dashboard", { state: { message: "Task updated successfully!" } });
    } catch (error) {
      console.error("Error updating task:", error.response?.data || error.message);
      // Optional: navigate anyway with failure message
      navigate("/dashboard", { state: { message: "Failed to update task!" } });
    }
  };

  if (loading) return <div className="loading">Loading task...</div>;

  return (
    <div className="edit-task-overlay">
      <form className="edit-task-form" onSubmit={handleSubmit}>
        <h2>Edit Task</h2>

        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          placeholder="Task Title"
          required
        />

        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
          placeholder="Task Description"
        />

        <select name="status" value={task.status} onChange={handleChange}>
          <option value="TODO">To Do</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="DONE">Done</option>
        </select>

        <button type="submit">Update Task</button>
      </form>
    </div>
  );
}

export default EditTask;