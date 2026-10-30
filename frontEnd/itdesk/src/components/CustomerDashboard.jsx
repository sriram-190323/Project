import React, { useState } from "react";
import api from "../services/api";

export default function CustomerDashboard({ onLogout }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmitTicket = async (e) => {
    e.preventDefault();
    try {
      await api.post("/tickets", { title, description });
      setMessage("Ticket submitted successfully! AI is analyzing your issue.");
      setTitle("");
      setDescription("");
    } catch (err) {
      setMessage("Failed to submit ticket.");
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h2>Customer Support Portal</h2>
        <button onClick={onLogout} style={styles.logoutBtn}>
          Logout
        </button>
      </header>
      <div style={styles.card}>
        <h3>Create New Support Ticket</h3>
        {message && <p style={styles.msg}>{message}</p>}
        <form onSubmit={handleSubmitTicket} style={styles.form}>
          <input
            type="text"
            placeholder="Issue Title (e.g., VPN connection failed)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
            required
          />
          <textarea
            placeholder="Describe your issue in detail..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={styles.textarea}
            required
          />
          <button type="submit" style={styles.button}>
            Submit Ticket
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    maxWidth: "600px",
    margin: "0 auto",
    fontFamily: "Arial",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginTop: "15px",
  },
  input: { padding: "10px", borderRadius: "4px", border: "1px solid #ccc" },
  textarea: {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    height: "100px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  logoutBtn: {
    padding: "6px 12px",
    background: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  msg: { color: "green", fontSize: "14px" },
};
