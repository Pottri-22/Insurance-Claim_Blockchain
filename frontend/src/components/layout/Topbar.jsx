import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={styles.topbar}>
      <span style={{ fontWeight: 600 }}>Dashboard</span>
      <button style={styles.logout} onClick={logout}>
        Logout
      </button>
    </div>
  );
}

const styles = {
  topbar: {
    height: 64,
    background: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 30px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.1)"
  },
  logout: {
    background: "#d32f2f",
    border: "none",
    color: "#fff",
    padding: "8px 14px",
    borderRadius: 4,
    cursor: "pointer"
  }
};
