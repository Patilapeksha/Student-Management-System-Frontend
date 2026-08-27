import { useEffect, useState } from "react";
import api from "../services/api";

function StudentAttendance() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadAttendance = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/parent/child-attendance");

      setAttendance(response.data.attendance || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to load attendance."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAttendance();
  }, []);

  return (
    <div className="page-container">
      <h1>My Attendance</h1>

      {error && (
        <p className="error-message">{error}</p>
      )}

      {loading ? (
        <p>Loading attendance...</p>
      ) : attendance.length === 0 ? (
        <p>No attendance records found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {attendance.map((record) => (
              <tr key={record.id}>
                <td>{record.date}</td>
                <td>{record.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button onClick={loadAttendance}>
        Refresh
      </button>
    </div>
  );
}

export default StudentAttendance;