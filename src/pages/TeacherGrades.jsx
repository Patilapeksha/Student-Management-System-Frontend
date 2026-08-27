import { useState } from "react";
import api from "../services/api";

function TeacherGrades() {
  const [studentId, setStudentId] = useState("");
  const [subject, setSubject] = useState("");
  const [marks, setMarks] = useState("");
  const [grade, setGrade] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!studentId || !subject || !marks || !grade) {
      setError("Please fill all fields.");
      return;
    }

    if (marks < 0 || marks > 100) {
      setError("Marks must be between 0 and 100.");
      return;
    }

    try {
      const response = await api.post("/academic", {
        student_id: Number(studentId),
        subject,
        marks: Number(marks),
        grade
      });

      setMessage(
        response.data.message ||
        "Academic record added successfully."
      );

      setStudentId("");
      setSubject("");
      setMarks("");
      setGrade("");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to add academic record."
      );
    }
  };

  return (
    <div className="page-container">
      <h1>Grade Entry</h1>

      {message && (
        <p className="success-message">{message}</p>
      )}

      {error && (
        <p className="error-message">{error}</p>
      )}

      <form onSubmit={handleSubmit}>
        <label>Student ID</label>

        <input
          type="number"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          placeholder="Enter student ID"
        />

        <label>Subject</label>

        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Enter subject"
        />

        <label>Marks</label>

        <input
          type="number"
          min="0"
          max="100"
          value={marks}
          onChange={(e) => setMarks(e.target.value)}
          placeholder="Enter marks"
        />

        <label>Grade</label>

        <select
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        >
          <option value="">Select Grade</option>
          <option value="A+">A+</option>
          <option value="A">A</option>
          <option value="B+">B+</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="F">F</option>
        </select>

        <button type="submit">
          Save Grade
        </button>
      </form>
    </div>
  );
}

export default TeacherGrades;