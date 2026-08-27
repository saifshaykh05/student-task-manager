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

  getTasks: (status = "") =>
    request(`/tasks${status ? `?status=${status}` : ""}`),

  getTask: (id) =>
    request(`/tasks/${id}`),

  createTask: (taskData) =>
    request("/tasks", {
      method: "POST",
      body: JSON.stringify(taskData),
    }),

  updateTask: (id, taskData) =>
    request(`/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify(taskData),
    }),

  updateStatus: (id, status) =>
    request(`/tasks/${id}/status?status=${status}`, {
      method: "PATCH",
    }),

  deleteTask: (id) =>
    request(`/tasks/${id}`, {
      method: "DELETE",
    }),
};