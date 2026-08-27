import { useState } from "react";
import { api } from "../services/api";

function TaskItem({ task, onTaskUpdated, onTaskDeleted }) {

  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState({
    title: task.title,
    description: task.description || "",
    status: task.status,
  });

  const [error, setError] = useState("");

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdate = async (event) => {

    event.preventDefault();
    setError("");

    try {

      const updatedTask =
        await api.updateTask(task.id, form);

      onTaskUpdated(updatedTask);
      setEditing(false);

    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async () => {

    try {

      await api.deleteTask(task.id);

      onTaskDeleted(task.id);

    } catch (error) {
      setError(error.message);
    }
  };

  const handleStatus = async () => {

    const newStatus =
      task.status === "PENDING"
        ? "COMPLETED"
        : "PENDING";

    try {

      const updatedTask =
        await api.updateStatus(
          task.id,
          newStatus
        );

      onTaskUpdated(updatedTask);

    } catch (error) {
      setError(error.message);
    }
  };

  if (editing) {
    return (
      <div className="task-card">

        <form onSubmit={handleUpdate}>

          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
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

          {error && <p className="error-message">{error}</p>}

          <button type="submit">
            Save
          </button>

          <button
            type="button"
            onClick={() => setEditing(false)}
          >
            Cancel
          </button>

        </form>

      </div>
    );
  }

  return (
    <div className="task-card">

      <h3>{task.title}</h3>

      <p>{task.description}</p>

      <p>
        Status: <strong>{task.status}</strong>
      </p>

      {error && (
        <p className="error-message">{error}</p>
      )}

      <button onClick={handleStatus}>
        {task.status === "PENDING"
          ? "Complete"
          : "Mark Pending"}
      </button>

      <button onClick={() => setEditing(true)}>
        Edit
      </button>

      <button onClick={handleDelete}>
        Delete
      </button>

    </div>
  );
}

export default TaskItem;