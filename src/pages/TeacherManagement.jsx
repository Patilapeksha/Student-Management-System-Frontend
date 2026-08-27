import { useEffect, useState } from "react";
import api from "../services/api";

const emptyForm = {
  name: "",
  email: "",
  password: "",
  subject: "",
  contact: ""
};

function TeacherManagement() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState(emptyForm);

  const loadTeachers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/teachers");

      setTeachers(response.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to load teachers."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTeachers();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (
      !form.name ||
      !form.email ||
      !form.subject ||
      !form.contact
    ) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      if (editingId) {
        const response = await api.put(
          `/teachers/${editingId}`,
          {
            name: form.name,
            email: form.email,
            phone: form.contact,
            subject: form.subject
          }
        );

        setMessage(
          response.data.message ||
          "Teacher updated successfully."
        );
      } else {
        if (!form.password) {
          setError("Password is required for a new teacher.");
          return;
        }

        const response = await api.post("/teachers", {
          name: form.name,
          email: form.email,
          phone: form.contact,
          subject: form.subject
        });

        setMessage(
          response.data.message ||
          "Teacher added successfully."
        );
      }

      setForm(emptyForm);
      setEditingId(null);

      await loadTeachers();
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to save teacher."
      );
    }
  };

  const handleEdit = (teacher) => {
    setMessage("");
    setError("");

    setEditingId(teacher.id);

    setForm({
      name: teacher.name || "",
      email: teacher.email || "",
      password: "",
      subject: teacher.subject || "",
      contact: teacher.phone || ""
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
    setMessage("");
    setError("");
  };

  const deactivateTeacher = async (id) => {
    if (!window.confirm("Deactivate this teacher?")) {
      return;
    }

    try {
      const response = await api.put(
        `/teachers/${id}/deactivate`
      );

      setMessage(
        response.data.message ||
        "Teacher deactivated successfully."
      );

      setError("");

      await loadTeachers();
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to deactivate teacher."
      );

      setMessage("");
    }
  };

  return (
    <div className="page-container">
      <h1>Teacher Management</h1>

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
            ? "Update Teacher"
            : "Add Teacher"}
        </h2>

        <input
          name="name"
          placeholder="Teacher Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        {!editingId && (
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
        )}

        <input
          name="subject"
          placeholder="Subject"
          value={form.subject}
          onChange={handleChange}
        />

        <input
          name="contact"
          placeholder="Contact Number"
          value={form.contact}
          onChange={handleChange}
        />

        <button type="submit">
          {editingId
            ? "Update Teacher"
            : "Add Teacher"}
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

      <h2>Teachers</h2>

      {loading ? (
        <p>Loading teachers...</p>
      ) : teachers.length === 0 ? (
        <p>No teachers found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Contact</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher.id}>
                <td>{teacher.id}</td>
                <td>{teacher.name}</td>
                <td>{teacher.email}</td>
                <td>{teacher.subject}</td>
                <td>{teacher.phone}</td>
                <td>{teacher.status}</td>

                <td>
                  {teacher.status !== "Inactive" && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          handleEdit(teacher)
                        }
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          deactivateTeacher(
                            teacher.id
                          )
                        }
                      >
                        Deactivate
                      </button>
                    </>
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

export default TeacherManagement;