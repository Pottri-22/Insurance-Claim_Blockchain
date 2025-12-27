import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "./authService";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setRole } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);
      const data = await login(email, password);
      const role = data.user.role;

      setRole(role);

      if (role === "admin") navigate("/admin");
      else if (role === "doctor") navigate("/doctor");
      else navigate("/patient");
    } catch {
      alert("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Health Insurance System</h2>

        <input
          style={styles.input}
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          style={{
            ...styles.button,
            background: loading ? "#999" : "#1e3c72"
          }}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Signing in..." : "Login"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#eef2f7"
  },
  card: {
    width: 420,
    padding: "40px 45px",
    background: "#fff",
    borderRadius: 8,
    boxShadow: "0 8px 24px rgba(0,0,0,0.15)"
  },
  title: {
    marginBottom: 25,
    textAlign: "center",
    color: "#1e3c72"
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    marginBottom: 18,
    fontSize: 15,
    borderRadius: 4,
    border: "1px solid #ccc"
  },
  button: {
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: 4,
    color: "#fff",
    fontSize: 16,
    cursor: "pointer"
  }
};
