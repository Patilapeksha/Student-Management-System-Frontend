import { useEffect, useState } from "react";
import api from "../services/api";

function ClassRoster() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadStudents = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/students");

      setStudents(response.data.students || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to load class roster."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  return (
    <div className="page-container">
      <h1>Class Roster</h1>

      {error && (
        <p className="error-message">{error}</p>
      )}

      {loading ? (
        <p>Loading students...</p>
      ) : students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Roll No</th>
              <th>Email</th>
              <th>Contact</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.roll_no}</td>
                <td>{student.email}</td>
                <td>{student.contact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button onClick={loadStudents}>
        Refresh
      </button>
    </div>
  );
}

export default ClassRoster;