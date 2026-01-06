import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "./authService";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { firebaseUser } = useAuth();
  const navigate = useNavigate();

  // 🔥 AUTO REDIRECT AFTER LOGIN
  useEffect(() => {
    if (firebaseUser) {
      navigate("/patient"); // or role-based later
    }
  }, [firebaseUser, navigate]);

  const handleLogin = async () => {
    try {
      setLoading(true);
      await login(email, password);
    } catch (err) {
      console.error("Login error:", err);
      // If it's an axios error, prefer the server-provided message
      if (err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message);
      } else if (err.code && err.message) {
        alert(err.code + " : " + err.message);
      } else {
        alert(err.message || JSON.stringify(err));
      }
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
          placeholder="Email"
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

        <button style={styles.button} onClick={handleLogin} disabled={loading}>
          {loading ? "Signing in..." : "Login"}
        </button>

        <p style={{ textAlign: "center", marginTop: 20 }}>
          New user?{" "}
          <span
            style={{ color: "#1e3c72", cursor: "pointer", fontWeight: "bold" }}
            onClick={() => navigate("/signup")}
          >
            Create an account
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#eef2f7",
  },
  card: {
    width: 420,
    padding: 40,
    background: "#fff",
    borderRadius: 8,
    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
  },
  title: {
    textAlign: "center",
    marginBottom: 30,
    color: "#1e3c72",
  },
  input: {
    width: "100%",
    padding: 12,
    marginBottom: 18,
    fontSize: 15,
  },
  button: {
    width: "100%",
    padding: 12,
    background: "#1e3c72",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
};
