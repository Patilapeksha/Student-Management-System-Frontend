import { useEffect, useState } from "react";
import api from "../services/api";

function FeeReport() {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadFees = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/fees");

      setFees(response.data.fees || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to load fee records."
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
      <h1>Fee Report</h1>

      {error && (
        <p className="error-message">{error}</p>
      )}

      {loading ? (
        <p>Loading fees...</p>
      ) : fees.length === 0 ? (
        <p>No fee records found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Student ID</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Due Date</th>
            </tr>
          </thead>

          <tbody>
            {fees.map((fee) => (
              <tr key={fee.id}>
                <td>{fee.id}</td>
                <td>{fee.student_id}</td>
                <td>{fee.amount}</td>
                <td>{fee.status}</td>
                <td>{fee.due_date
                     ? new
                     Date(fee.due_date).toLocaleDateString() : "-"} </td>
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

export default FeeReport;