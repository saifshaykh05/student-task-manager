import { useEffect, useState } from "react";
import { api } from "../services/api";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";

function Dashboard({ user, onLogout }) {

  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await api.getTasks(status);

      setTasks(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [status]);

  return (
    <div className="dashboard">

      <header className="dashboard-header">

        <div>
          <h1>Student Task Manager</h1>
          <p>Welcome, {user.name}</p>
        </div>

        <button
          className="logout-button"
          onClick={onLogout}
        >
          Logout
        </button>

      </header>

      <main className="dashboard-content">

        <section className="create-task-section">
          <TaskForm
            onTaskCreated={(newTask) => {
              setTasks((currentTasks) => [
                newTask,
                ...currentTasks,
              ]);
            }}
          />
        </section>

        <section className="tasks-section">

          <div className="tasks-header">

            <h2>My Tasks</h2>

            <select
              value={status}
              onChange={(event) =>
                setStatus(event.target.value)
              }
            >
              <option value="">All Tasks</option>
              <option value="PENDING">Pending</option>
              <option value="COMPLETED">Completed</option>
            </select>

          </div>

          {error && (
            <p className="error-message">
              {error}
            </p>
          )}

          {loading ? (
            <p>Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <p className="no-tasks">
              No tasks found.
            </p>
          ) : (
            <div className="task-list">

              {tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onTaskUpdated={(updatedTask) => {
                    setTasks((currentTasks) =>
                      currentTasks.map((currentTask) =>
                        currentTask.id === updatedTask.id
                          ? updatedTask
                          : currentTask
                      )
                    );
                  }}
                  onTaskDeleted={(deletedTaskId) => {
                    setTasks((currentTasks) =>
                      currentTasks.filter(
                        (currentTask) =>
                          currentTask.id !== deletedTaskId
                      )
                    );
                  }}
                />
              ))}

            </div>
          )}

        </section>

      </main>

    </div>
  );
}

export default Dashboard;