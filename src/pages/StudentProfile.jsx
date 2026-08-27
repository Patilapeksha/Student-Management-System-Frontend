import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function StudentProfile() {
  const { user } = useAuth();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/parent/child-profile");

      setProfile(response.data.child);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to load profile."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <div className="page-container">
      <h1>Student Profile</h1>

      <p>Logged in as: {user?.name}</p>

      {error && (
        <p className="error-message">{error}</p>
      )}

      {loading ? (
        <p>Loading profile...</p>
      ) : profile ? (
        <div className="profile-card">
          <p>
            <strong>Name:</strong> {profile.name}
          </p>

          <p>
            <strong>Roll No:</strong>{" "}
            {profile.roll_no}
          </p>

          <p>
            <strong>Parent:</strong>{" "}
            {profile.parent_name}
          </p>

          <p>
            <strong>Guardian Contact:</strong>{" "}
            {profile.guardian_contact}
          </p>

          <p>
            <strong>Contact:</strong>{" "}
            {profile.contact}
          </p>
        </div>
      ) : (
        <p>No profile found.</p>
      )}
    </div>
  );
}

export default StudentProfile;