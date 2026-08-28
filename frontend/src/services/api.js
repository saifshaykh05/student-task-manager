const API_BASE_URL = "http://localhost:8080/api";

async function request(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 204) {
    return null;
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

export const api = {

  // =========================
  // AUTH
  // =========================

  register: (userData) =>
    request("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    }),

  login: (loginData) =>
    request("/auth/login", {
      method: "POST",
      body: JSON.stringify(loginData),
    }),


  // =========================
  // ADMIN
  // =========================

  createTeacher: (teacherData) =>
    request("/admin/teachers", {
      method: "POST",
      body: JSON.stringify(teacherData),
    }),

  getTeachers: () =>
    request("/admin/teachers"),

  getAdminStudents: () =>
    request("/admin/students"),


  // =========================
  // TEACHER
  // =========================

  getStudents: () =>
    request("/teacher/students"),

  getTeacherTasks: () =>
    request("/teacher/tasks"),

  createTeacherTask: (taskData) =>
    request("/teacher/tasks", {
      method: "POST",
      body: JSON.stringify(taskData),
    }),


  // =========================
  // STUDENT
  // =========================

  getStudentTasks: (status = "") =>
    request(
      `/student/tasks${status ? `?status=${status}` : ""}`
    ),

  getStudentTask: (id) =>
    request(`/student/tasks/${id}`),

  updateStudentTaskStatus: (id, status) =>
    request(
      `/student/tasks/${id}/status?status=${status}`,
      {
        method: "PATCH",
      }
    ),
};