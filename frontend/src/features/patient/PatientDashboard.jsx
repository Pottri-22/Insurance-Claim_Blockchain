import DashboardLayout from "../../components/layout/DashboardLayout";

export default function PatientDashboard() {
  return (
    <DashboardLayout>
      <h2 style={{ marginBottom: 20 }}>Patient Dashboard</h2>

      <div style={styles.cards}>
        <div style={styles.card}>Total Claims: 12</div>
        <div style={styles.card}>Approved: 8</div>
        <div style={styles.card}>Pending: 4</div>
      </div>
    </DashboardLayout>
  );
}

const styles = {
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 20
  },
  card: {
    background: "#fff",
    padding: 20,
    borderRadius: 6,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    fontSize: 16
  }
};
