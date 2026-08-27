import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function StudentDashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div>
          <h1>Student Dashboard</h1>
          <p>Welcome, {user?.name}</p>
        </div>

        <button onClick={logout}>Logout</button>
      </header>

      <main className="dashboard-content">

        <div className="dashboard-card">
          <h3>My Profile</h3>
          <p>View your profile information.</p>

          <Link to="/student/profile">
            <button>View Profile</button>
          </Link>
        </div>

        <div className="dashboard-card">
          <h3>Attendance</h3>
          <p>View your attendance records.</p>

          <Link to="/student/attendance">
            <button>View Attendance</button>
          </Link>
        </div>

        <div className="dashboard-card">
          <h3>Grades / Report Card</h3>
          <p>View your academic results.</p>

          <Link to="/student/grades">
            <button>View Grades</button>
          </Link>
        </div>

        <div className="dashboard-card">
          <h3>Fee Status</h3>
          <p>View your fee information.</p>

          <Link to="/student/fees">
            <button>View Fees</button>
          </Link>
        </div>

      </main>
    </div>
  );
}

export default StudentDashboard;