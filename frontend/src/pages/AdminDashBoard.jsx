import { useEffect, useState } from "react";
import { api } from "../services/api";

function AdminDashboard({ user, onLogout }) {

  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loadingTeachers, setLoadingTeachers] = useState(true);
  const [loadingStudents, setLoadingStudents] = useState(true);
  const [creating, setCreating] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =========================
  // LOAD TEACHERS
  // =========================

  const loadTeachers = async () => {

    try {

      setLoadingTeachers(true);

      const data = await api.getTeachers();

      setTeachers(data);

    } catch (error) {

      setError(error.message);

    } finally {

      setLoadingTeachers(false);

    }
  };

  // =========================
  // LOAD STUDENTS
  // =========================

  const loadStudents = async () => {

    try {

      setLoadingStudents(true);

      const data = await api.getAdminStudents();

      setStudents(data);

    } catch (error) {

      setError(error.message);

    } finally {

      setLoadingStudents(false);

    }
  };

  // =========================
  // INITIAL LOAD
  // =========================

  useEffect(() => {

    loadTeachers();
    loadStudents();

  }, []);

  // =========================
  // CREATE TEACHER
  // =========================

  const handleCreateTeacher = async (event) => {

    event.preventDefault();

    setError("");
    setSuccess("");

    if (!name.trim()) {
      setError("Teacher name is required.");
      return;
    }

    if (!email.trim()) {
      setError("Teacher email is required.");
      return;
    }

    if (!password) {
      setError("Teacher password is required.");
      return;
    }

    try {

      setCreating(true);

      const newTeacher = await api.createTeacher({
        name: name.trim(),
        email: email.trim(),
        password,
      });

      setTeachers((currentTeachers) => [
        ...currentTeachers,
        newTeacher,
      ]);

      setName("");
      setEmail("");
      setPassword("");

      setSuccess(
        "Teacher created successfully."
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

          <h1>
            Student Task Manager
          </h1>

          <p>
            Welcome, {user.name}
          </p>

          <small>
            Role: Admin
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
            CREATE TEACHER
        ========================= */}

        <section className="create-task-section">

          <h2>
            Create Teacher
          </h2>

          <p>
            Create a teacher account.
          </p>

          <form
            className="teacher-task-form"
            onSubmit={handleCreateTeacher}
          >

            <div className="form-group">

              <label htmlFor="teacher-name">
                Name
              </label>

              <input
                id="teacher-name"
                type="text"
                placeholder="Enter teacher name"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
              />

            </div>

            <div className="form-group">

              <label htmlFor="teacher-email">
                Email
              </label>

              <input
                id="teacher-email"
                type="email"
                placeholder="Enter teacher email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
              />

            </div>

            <div className="form-group">

              <label htmlFor="teacher-password">
                Password
              </label>

              <input
                id="teacher-password"
                type="password"
                placeholder="Enter teacher password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
              />

            </div>

            <button
              type="submit"
              className="create-task-button"
              disabled={creating}
            >
              {creating
                ? "Creating..."
                : "Create Teacher"}
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
            TEACHERS
        ========================= */}

        <section className="tasks-section">

          <div className="tasks-header">

            <div>

              <h2>
                All Teachers
              </h2>

              <p>
                Teachers registered in the system.
              </p>

            </div>

          </div>

          {loadingTeachers ? (

            <p>
              Loading teachers...
            </p>

          ) : teachers.length === 0 ? (

            <p className="no-tasks">
              No teachers found.
            </p>

          ) : (

            <div className="task-list">

              {teachers.map((teacher) => (

                <div
                  className="task-card"
                  key={teacher.userId}
                >

                  <h3>
                    {teacher.name}
                  </h3>

                  <p>
                    <strong>Email:</strong>{" "}
                    {teacher.email}
                  </p>

                  <p>
                    <strong>Role:</strong>{" "}
                    {teacher.role}
                  </p>

                </div>

              ))}

            </div>

          )}

        </section>

        {/* =========================
            STUDENTS
        ========================= */}

        <section className="tasks-section">

          <div className="tasks-header">

            <div>

              <h2>
                All Students
              </h2>

              <p>
                Students registered in the system.
              </p>

            </div>

          </div>

          {loadingStudents ? (

            <p>
              Loading students...
            </p>

          ) : students.length === 0 ? (

            <p className="no-tasks">
              No students found.
            </p>

          ) : (

            <div className="task-list">

              {students.map((student) => (

                <div
                  className="task-card"
                  key={student.userId}
                >

                  <h3>
                    {student.name}
                  </h3>

                  <p>
                    <strong>Email:</strong>{" "}
                    {student.email}
                  </p>

                  <p>
                    <strong>Role:</strong>{" "}
                    {student.role}
                  </p>

                </div>

              ))}

            </div>

          )}

        </section>

      </main>

    </div>
  );
}

export default AdminDashboard;