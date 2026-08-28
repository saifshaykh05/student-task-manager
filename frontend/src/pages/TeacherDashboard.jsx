import { useEffect, useState } from "react";
import { api } from "../services/api";

function TeacherDashboard({ user, onLogout }) {

  const [students, setStudents] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedToId, setAssignedToId] = useState("");
  const [deadline, setDeadline] = useState("");

  const [loadingStudents, setLoadingStudents] = useState(true);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [creating, setCreating] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =========================
  // LOAD STUDENTS
  // =========================

  const loadStudents = async () => {
    try {
      setLoadingStudents(true);
      setError("");

      const data = await api.getStudents();

      setStudents(data);

    } catch (error) {
      setError(error.message);
    } finally {
      setLoadingStudents(false);
    }
  };

  // =========================
  // LOAD TEACHER TASKS
  // =========================

  const loadTasks = async (showLoading = true) => {
    try {

      if (showLoading) {
        setLoadingTasks(true);
      }

      const data = await api.getTeacherTasks();

      setTasks(data);

    } catch (error) {
      setError(error.message);
    } finally {

      if (showLoading) {
        setLoadingTasks(false);
      }

    }
  };

  // =========================
  // INITIAL LOAD
  // =========================

  useEffect(() => {

    loadStudents();
    loadTasks();

  }, []);

  // =========================
  // AUTO REFRESH TASKS
  // =========================

  useEffect(() => {

    const interval = setInterval(() => {
      loadTasks(false);
    }, 5000);

    return () => {
      clearInterval(interval);
    };

  }, []);

  // =========================
  // CREATE TASK
  // =========================

  const handleCreateTask = async (event) => {

    event.preventDefault();

    setError("");
    setSuccess("");

    if (!title.trim()) {
      setError("Task title is required.");
      return;
    }

    if (!assignedToId) {
      setError("Please select a student.");
      return;
    }

    try {

      setCreating(true);

      const newTask =
        await api.createTeacherTask({
          title: title.trim(),
          description: description.trim(),
          assignedToId: Number(assignedToId),
          deadline: deadline || null,
        });

      setTasks((currentTasks) => [
        newTask,
        ...currentTasks,
      ]);

      setTitle("");
      setDescription("");
      setAssignedToId("");
      setDeadline("");

      setSuccess(
        "Task assigned successfully."
      );

    } catch (error) {
      setError(error.message);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="dashboard">

      {/* =========================
          HEADER
      ========================= */}

      <header className="dashboard-header">

        <div>
          <h1>Student Task Manager</h1>

          <p>
            Welcome, {user.name}
          </p>

          <small>
            Role: Teacher
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

        {/* =========================
            CREATE ASSIGNMENT
        ========================= */}

        <section className="create-task-section">

          <h2>
            Create Assignment
          </h2>

          <p>
            Assign a task to a student.
          </p>

          <form
            className="teacher-task-form"
            onSubmit={handleCreateTask}
          >

            <div className="form-group">

              <label htmlFor="title">
                Task Title
              </label>

              <input
                id="title"
                type="text"
                placeholder="Enter task title"
                value={title}
                onChange={(event) =>
                  setTitle(event.target.value)
                }
              />

            </div>

            <div className="form-group">

              <label htmlFor="description">
                Description
              </label>

              <textarea
                id="description"
                placeholder="Enter task description"
                value={description}
                onChange={(event) =>
                  setDescription(event.target.value)
                }
                rows="4"
              />

            </div>

            <div className="form-group">

              <label htmlFor="student">
                Assign To
              </label>

              {loadingStudents ? (

                <p>
                  Loading students...
                </p>

              ) : students.length === 0 ? (

                <p className="no-students">
                  No students registered yet.
                </p>

              ) : (

                <select
                  id="student"
                  value={assignedToId}
                  onChange={(event) =>
                    setAssignedToId(event.target.value)
                  }
                >

                  <option value="">
                    Select a student
                  </option>

                  {students.map((student) => (

                    <option
                      key={student.id}
                      value={student.id}
                    >
                      {student.name} ({student.email})
                    </option>

                  ))}

                </select>

              )}

            </div>

            <div className="form-group">

              <label htmlFor="deadline">
                Deadline
              </label>

              <input
                id="deadline"
                type="datetime-local"
                value={deadline}
                onChange={(event) =>
                  setDeadline(event.target.value)
                }
              />

            </div>

            <button
              type="submit"
              className="create-task-button"
              disabled={
                creating ||
                students.length === 0
              }
            >
              {creating
                ? "Assigning..."
                : "Assign Task"}
            </button>

          </form>

        </section>

        {/* =========================
            MESSAGES
        ========================= */}

        {error && (
          <p className="error-message">
            {error}
          </p>
        )}

        {success && (
          <p className="success-message">
            {success}
          </p>
        )}

        {/* =========================
            TEACHER TASKS
        ========================= */}

        <section className="tasks-section">

          <div className="tasks-header">

            <div>
              <h2>
                Assigned Tasks
              </h2>

              <p>
                Tasks created by you.
              </p>
            </div>

          </div>

          {loadingTasks ? (

            <p>
              Loading tasks...
            </p>

          ) : tasks.length === 0 ? (

            <p className="no-tasks">
              No assignments created yet.
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
                        Assigned To:
                      </strong>{" "}
                      {task.assignedToName}
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

                </div>

              ))}

            </div>

          )}

        </section>

      </main>

    </div>
  );
}

export default TeacherDashboard;