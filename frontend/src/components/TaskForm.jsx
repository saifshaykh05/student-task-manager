import { useState } from "react";
import { api } from "../services/api";

function TaskForm({ onTaskCreated }) {

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "PENDING",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {

      const newTask = await api.createTask(form);

      onTaskCreated(newTask);

      setForm({
        title: "",
        description: "",
        status: "PENDING",
      });

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>

      <h2>Create New Task</h2>

      <form className="task-form" onSubmit={handleSubmit}>

        <input
          type="text"
          name="title"
          placeholder="Task title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Task description"
          value={form.description}
          onChange={handleChange}
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value="PENDING">Pending</option>
          <option value="COMPLETED">Completed</option>
        </select>

        {error && (
          <p>{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Task"}
        </button>

      </form>

    </div>
  );
}

export default TaskForm;