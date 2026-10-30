import React, { useState } from "react";
import api from "../services/api";

export default function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { username, password });
      const { token, role } = response.data; // Expecting JWT & role from Spring Boot

      localStorage.setItem("jwt_token", token);
      localStorage.setItem("user_role", role);
      localStorage.setItem("username", username);

      onLoginSuccess(role);
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>IT Helpdesk Login</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f6f9",
  },
  card: {
    padding: "30px",
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    width: "320px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginTop: "15px",
  },
  input: { padding: "10px", borderRadius: "4px", border: "1px solid #ccc" },
  button: {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  error: { color: "red", fontSize: "14px" },
};
