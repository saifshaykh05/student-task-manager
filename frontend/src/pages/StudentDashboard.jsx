import { useEffect, useState } from "react";
import { api } from "../services/api";

function StudentDashboard({ user, onLogout }) {

  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [updatingTaskId, setUpdatingTaskId] = useState(null);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await api.getStudentTasks(status);

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

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      setUpdatingTaskId(taskId);
      setError("");

      const updatedTask =
        await api.updateStudentTaskStatus(
          taskId,
          newStatus
        );

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === updatedTask.id
            ? updatedTask
            : task
        )
      );

    } catch (error) {
      setError(error.message);
    } finally {
      setUpdatingTaskId(null);
    }
  };

  return (
    <div className="dashboard">

      <header className="dashboard-header">

        <div>
          <h1>Student Task Manager</h1>
          <p>
            Welcome, {user.name}
          </p>
          <small>
            Role: Student
          </small>
        </div>

        <button
          className="logout-button"
          onClick={onLogout}
        >
          Logout
        </button>

      </header>

      <main className="dashboard-content">

        <section className="tasks-section">

          <div className="tasks-header">

            <div>
              <h2>My Assigned Tasks</h2>
              <p>
                Tasks assigned to you by your teacher.
              </p>
            </div>

            <select
              value={status}
              onChange={(event) =>
                setStatus(event.target.value)
              }
            >
              <option value="">
                All Tasks
              </option>

              <option value="PENDING">
                Pending
              </option>

              <option value="COMPLETED">
                Completed
              </option>
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
              No assigned tasks found.
            </p>
          ) : (

            <div className="task-list">

              {tasks.map((task) => (

                <div
                  className="task-card"
                  key={task.id}
                >

                  <div className="task-card-header">

                    <h3>
                      {task.title}
                    </h3>

                    <span
                      className={
                        task.status === "COMPLETED"
                          ? "status completed"
                          : "status pending"
                      }
                    >
                      {task.status}
                    </span>

                  </div>

                  <p className="task-description">
                    {task.description ||
                      "No description provided."}
                  </p>

                  <div className="task-details">

                    <p>
                      <strong>
                        Assigned by:
                      </strong>{" "}
                      Teacher
                    </p>

                    {task.deadline && (
                      <p>
                        <strong>
                          Deadline:
                        </strong>{" "}
                        {new Date(
                          task.deadline
                        ).toLocaleString()}
                      </p>
                    )}

                    <p>
                      <strong>
                        Created:
                      </strong>{" "}
                      {new Date(
                        task.createdAt
                      ).toLocaleString()}
                    </p>

                  </div>

                  {task.status === "PENDING" && (

                    <button
                      className="complete-task-button"
                      disabled={
                        updatingTaskId === task.id
                      }
                      onClick={() =>
                        handleStatusChange(
                          task.id,
                          "COMPLETED"
                        )
                      }
                    >
                      {updatingTaskId === task.id
                        ? "Updating..."
                        : "Mark as Completed"}
                    </button>

                  )}

                </div>

              ))}

            </div>

          )}

        </section>

      </main>

    </div>
  );
}

export default StudentDashboard;