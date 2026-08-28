import TeacherDashboard from "./TeacherDashboard";
import StudentDashboard from "./StudentDashboard";

function Dashboard({ user, onLogout }) {

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