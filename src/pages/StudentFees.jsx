import { useEffect, useState } from "react";
import api from "../services/api";

function StudentFees() {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadFees = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/parent/child-fees");

      setFees(response.data.fees || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to load fee information."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFees();
  }, []);

  return (
    <div className="page-container">
      <h1>Fee Status</h1>

      {error && (
        <p className="error-message">{error}</p>
      )}

      {loading ? (
        <p>Loading fee information...</p>
      ) : fees.length === 0 ? (
        <p>No fee records found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Due Date</th>
            </tr>
          </thead>

          <tbody>
            {fees.map((fee) => (
              <tr key={fee.id}>
                <td>{fee.id}</td>
                <td>{fee.amount}</td>
                <td>{fee.status}</td>
                <td>{fee.due_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button onClick={loadFees}>
        Refresh
      </button>
    </div>
  );
}

export default StudentFees;