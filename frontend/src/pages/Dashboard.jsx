import AdminDashboard from "./AdminDashboard";
import TeacherDashboard from "./TeacherDashboard";
import StudentDashboard from "./StudentDashboard";

function Dashboard({ user, onLogout }) {

  if (user.role === "ADMIN") {
    return (
      <AdminDashboard
        user={user}
        onLogout={onLogout}
      />
    );
  }

  if (user.role === "TEACHER") {
    return (
      <TeacherDashboard
        user={user}
        onLogout={onLogout}
      />
    );
  }

  return (
    <StudentDashboard
      user={user}
      onLogout={onLogout}
    />
  );
}

export default Dashboard;