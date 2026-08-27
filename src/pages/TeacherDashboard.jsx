import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function TeacherDashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div>
          <h1>Teacher Dashboard</h1>
          <p>Welcome, {user?.name}</p>
        </div>

        <button onClick={logout}>Logout</button>
      </header>

      <main className="dashboard-content">

        <div className="dashboard-card">
          <h3>Class Roster</h3>
          <p>View students in your class.</p>

          <Link to="/teacher/roster">
            <button>View Roster</button>
          </Link>
        </div>

        <div className="dashboard-card">
          <h3>Mark Attendance</h3>
          <p>Record student attendance.</p>

          <Link to="/teacher/attendance">
            <button>Mark Attendance</button>
          </Link>
        </div>

        <div className="dashboard-card">
          <h3>Grade Entry</h3>
          <p>Enter student marks and grades.</p>

          <Link to="/teacher/grades">
            <button>Enter Grades</button>
          </Link>
        </div>

      </main>
    </div>
  );
}

export default TeacherDashboard;