import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div style={styles.sidebar}>
      <div style={styles.logo}>Insurance</div>

      <Link style={styles.link} to="/admin">Dashboard</Link>
      <Link style={styles.link} to="#">Claims</Link>
      <Link style={styles.link} to="#">Policies</Link>
      <Link style={styles.link} to="#">Profile</Link>
    </div>
  );
}

const styles = {
  sidebar: {
    width: 240,
    minWidth: 240,          // ✅ PREVENT COLLAPSE
    background: "#1e3c72",
    color: "#fff",
    padding: "30px 20px",
    boxSizing: "border-box"
  },
  logo: {
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 40
  },
  link: {
    display: "block",
    color: "#fff",
    textDecoration: "none",
    padding: "10px 0",
    fontSize: 15
  }
};
