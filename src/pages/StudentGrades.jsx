import { useEffect, useState } from "react";
import api from "../services/api";

function StudentGrades() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadGrades = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/parent/child-academic");

      setRecords(response.data.records || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to load academic records."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGrades();
  }, []);

  return (
    <div className="page-container">
      <h1>Grades / Report Card</h1>

      {error && (
        <p className="error-message">{error}</p>
      )}

      {loading ? (
        <p>Loading grades...</p>
      ) : records.length === 0 ? (
        <p>No academic records found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Marks</th>
              <th>Grade</th>
            </tr>
          </thead>

          <tbody>
            {records.map((record) => (
              <tr key={record.id}>
                <td>{record.subject}</td>
                <td>{record.marks}</td>
                <td>{record.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button onClick={loadGrades}>
        Refresh
      </button>
    </div>
  );
}

export default StudentGrades;