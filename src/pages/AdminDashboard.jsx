import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminDashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Welcome, {user?.name}</p>
        </div>

        <button onClick={logout}>Logout</button>
      </header>

      <main className="dashboard-content">

        <div className="dashboard-card">
          <h3>Student Management</h3>
          <p>Add, edit and delete student records.</p>

          <Link to="/admin/students">
            <button>Manage Students</button>
          </Link>
        </div>

        <div className="dashboard-card">
          <h3>Teacher Management</h3>
          <p>Add, edit and delete teacher records.</p>

          <Link to="/admin/teachers">
            <button>Manage Teachers</button>
          </Link>
        </div>

        <div className="dashboard-card">
          <h3>Attendance Report</h3>
          <p>View student attendance records.</p>

          <Link to="/admin/attendance">
            <button>View Attendance</button>
          </Link>
        </div>

        <div className="dashboard-card">
          <h3>Fee Report</h3>
          <p>View student fee information.</p>

          <Link to="/admin/fees">
            <button>View Fees</button>
          </Link>
        </div>

      </main>
    </div>
  );
}

export default AdminDashboard;