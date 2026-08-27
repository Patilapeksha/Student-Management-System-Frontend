import { useEffect, useState } from "react";
import api from "../services/api";

function TeacherAttendance() {
  const [students, setStudents] = useState([]);
  const [date, setDate] = useState("");
  const [attendance, setAttendance] = useState({});
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.get("/students");
        setStudents(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
          "Unable to load students."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleStatusChange = (studentId, status) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!date) {
      setError("Please select a date.");
      return;
    }

    if (students.length === 0) {
      setError("No students available.");
      return;
    }

    const unmarkedStudent = students.find(
      (student) => !attendance[student.id]
    );

    if (unmarkedStudent) {
      setError(`Please mark attendance for ${unmarkedStudent.name}.`);
      return;
    }

    try {
      for (const student of students) {
        await api.post("/attendance", {
          student_id: student.id,
          date,
          status: attendance[student.id]
        });
      }

      setMessage("Attendance saved successfully.");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to save attendance."
      );
    }
  };

  return (
    <div className="page-container">
      <h1>Teacher Attendance</h1>

      {message && (
        <p className="success-message">{message}</p>
      )}

      {error && (
        <p className="error-message">{error}</p>
      )}

      <form onSubmit={handleSubmit}>
        <label>Date</label>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <h2>Class Roster</h2>

        {loading ? (
          <p>Loading students...</p>
        ) : students.length === 0 ? (
          <p>No students found.</p>
        ) : (
          <div className="attendance-table">
            <div className="attendance-row attendance-header">
              <span>Student ID</span>
              <span>Student Name</span>
              <span>Attendance</span>
            </div>

            {students.map((student) => (
              <div
                className="attendance-row"
                key={student.id}
              >
                <span>{student.id}</span>

                <span>{student.name}</span>

                <span>
                  <button
                    type="button"
                    onClick={() =>
                      handleStatusChange(
                        student.id,
                        "PRESENT"
                      )
                    }
                  >
                    Present
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleStatusChange(
                        student.id,
                        "ABSENT"
                      )
                    }
                  >
                    Absent
                  </button>

                  {attendance[student.id] && (
                    <strong>
                      {" "}
                      {attendance[student.id]}
                    </strong>
                  )}
                </span>
              </div>
            ))}
          </div>
        )}

        <button type="submit">
          Save Attendance
        </button>
      </form>
    </div>
  );
}

export default TeacherAttendance;