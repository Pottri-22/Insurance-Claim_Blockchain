import { useEffect, useState } from "react";
import api from "../../config/axiosPublic";

export default function InsuranceCompanies({ reload }) {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("firebaseToken");
    if (!token) return;

    const load = async () => {
      try {
        const res = await api.get("/insurance-companies/all");
        setCompanies(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [reload]);

  if (loading) return <p>Loading companies...</p>;

  return (
    <div style={{ marginTop: 40 }}>
      <h3 style={{ marginBottom: 15 }}>Insurance Companies</h3>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Wallet Address</th>
          </tr>
        </thead>

        <tbody>
          {companies.length === 0 ? (
            <tr>
              <td colSpan="3" style={styles.empty}>
                No companies found
              </td>
            </tr>
          ) : (
            companies.map((c) => (
              <tr key={c._id}>
                <td style={styles.td}>{c.name}</td>
                <td style={styles.td}>{c.email}</td>
                <td style={{ ...styles.td, fontFamily: "monospace" }}>
                  {c.walletAddress}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "#fff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    borderRadius: 6,
    overflow: "hidden"
  },
  th: {
    textAlign: "left",
    padding: "14px 16px",
    background: "#f5f7fa",
    borderBottom: "2px solid #e0e0e0",
    fontWeight: 600
  },
  td: {
    padding: "14px 16px",
    borderBottom: "1px solid #eee",
    verticalAlign: "middle"
  },
  empty: {
    padding: 20,
    textAlign: "center",
    color: "#777"
  }
};
