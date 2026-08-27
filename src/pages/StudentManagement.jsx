import { useEffect, useState } from "react";
import api from "../services/api";

const emptyForm = {
  name: "",
  roll_no: "",
  class_name: "",
  section: "",
  guardian_name: "",
  guardian_contact: "",
  contact: "",
  admission_date: "",
};

function StudentManagement() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState(emptyForm);

  const loadStudents = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/students");

      setStudents(response.data.students || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to load students."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (
      !form.name ||
      !form.roll_no ||
      !form.class_name ||
      !form.section
    ) {
      setError(
        "Name, roll number, class and section are required."
      );
      return;
    }

    try {
      if (editingId) {
        const response = await api.put(
          `/students/${editingId}`,
          form
        );

        setMessage(
          response.data.message ||
            "Student updated successfully."
        );
      } else {
        const response = await api.post(
          "/students",
          form
        );

        setMessage(
          response.data.message ||
            "Student added successfully."
        );
      }

      setForm(emptyForm);
      setEditingId(null);

      await loadStudents();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to save student."
      );
    }
  };

  const handleEdit = (student) => {
    setMessage("");
    setError("");

    setEditingId(student.id);

    setForm({
      name: student.name || "",
      roll_no: student.roll_no || "",
      class_name: student.class_name || "",
      section: student.section || "",
      guardian_name: student.guardian_name || "",
      guardian_contact: student.guardian_contact || "",
      contact: student.contact || "",
      admission_date: student.admission_date
        ? String(student.admission_date).substring(0, 10)
        : "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
    setMessage("");
    setError("");
  };

  const deactivateStudent = async (id) => {
    if (!window.confirm("Deactivate this student?")) {
      return;
    }

    try {
      const response = await api.patch(
        `/students/${id}/deactivate`
      );

      setMessage(
        response.data.message ||
          "Student deactivated successfully."
      );

      setError("");

      await loadStudents();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to deactivate student."
      );

      setMessage("");
    }
  };

  return (
    <div className="page-container">
      <h1>Student Management</h1>

      {message && (
        <p className="success-message">
          {message}
        </p>
      )}

      {error && (
        <p className="error-message">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <h2>
          {editingId
            ? "Update Student"
            : "Add Student"}
        </h2>

        <input
          name="name"
          placeholder="Student Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="roll_no"
          placeholder="Roll Number"
          value={form.roll_no}
          onChange={handleChange}
        />

        <input
          name="class_name"
          placeholder="Class"
          value={form.class_name}
          onChange={handleChange}
        />

        <input
          name="section"
          placeholder="Section"
          value={form.section}
          onChange={handleChange}
        />

        <input
          name="guardian_name"
          placeholder="Guardian Name"
          value={form.guardian_name}
          onChange={handleChange}
        />

        <input
          name="guardian_contact"
          placeholder="Guardian Contact"
          value={form.guardian_contact}
          onChange={handleChange}
        />

        <input
          name="contact"
          placeholder="Student Contact"
          value={form.contact}
          onChange={handleChange}
        />

        <label>Admission Date</label>

        <input
          name="admission_date"
          type="date"
          value={form.admission_date}
          onChange={handleChange}
        />

        <button type="submit">
          {editingId
            ? "Update Student"
            : "Add Student"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={cancelEdit}
          >
            Cancel
          </button>
        )}
      </form>

      <hr />

      <h2>Students</h2>

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
              <th>Class</th>
              <th>Section</th>
              <th>Guardian</th>
              <th>Guardian Contact</th>
              <th>Contact</th>
              <th>Admission Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>

                <td>{student.name}</td>

                <td>{student.roll_no}</td>

                <td>{student.class_name}</td>

                <td>{student.section}</td>

                <td>
                  {student.guardian_name || "-"}
                </td>

                <td>
                  {student.guardian_contact || "-"}
                </td>

                <td>
                  {student.contact || "-"}
                </td>

                <td>
                  {student.admission_date
                    ? new Date(
                        student.admission_date
                      ).toLocaleDateString("en-IN")
                    : "-"}
                </td>

                <td>
                  {student.is_active
                    ? "Active"
                    : "Inactive"}
                </td>

                <td>
                  {student.is_active ? (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          handleEdit(student)
                        }
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          deactivateStudent(
                            student.id
                          )
                        }
                      >
                        Deactivate
                      </button>
                    </>
                  ) : (
                    <span>Inactive</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default StudentManagement;