import { useEffect, useState } from "react";
import api from "../services/api";

function AttendanceReport() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadAttendance = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/attendance");

      setAttendance(response.data.attendance || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to load attendance records."
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
      <h1>Attendance Report</h1>

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
              <th>ID</th>
              <th>Student ID</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {attendance.map((record) => (
              <tr key={record.id}>
                <td>{record.id}</td>
                <td>{record.student_id}</td>
                <td>{new
                Date(record.attendance_date).toLocaleDateString()} </td>
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

export default AttendanceReport;