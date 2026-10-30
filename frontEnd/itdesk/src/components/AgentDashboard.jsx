import React, { useState, useEffect } from "react";
import api from "../services/api";

export default function AgentDashboard({ onLogout }) {
  const [tickets, setTickets] = useState([]);
  const [liveAlert, setLiveAlert] = useState(null);

  // 1. Fetch initial tickets via standard CRUD GET API
  useEffect(() => {
    api
      .get("/tickets")
      .then((res) => setTickets(res.data))
      .catch((err) => console.error("Error fetching tickets", err));

    // 2. Establish Real-Time Server-Sent Events (SSE) connection
    const token = localStorage.getItem("jwt_token");
    // Note: EventSource doesn't support custom headers natively in all browsers,
    // passing token via query param is common for SSE: /api/tickets/subscribe?token=...
    const eventSource = new EventSource(
      `http://localhost:8080/api/tickets/subscribe?token=${token}`,
    );

    eventSource.addEventListener("NEW_AI_TICKET", (event) => {
      const newTicket = JSON.parse(event.data);
      setLiveAlert(
        `⚡ New Live Ticket Alert: #${newTicket.id} - ${newTicket.title}`,
      );
      setTickets((prev) => [newTicket, ...prev]);
    });

    eventSource.onerror = (error) => {
      console.error("SSE connection error:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h2>Support Agent Triage Dashboard</h2>
        <button onClick={onLogout} style={styles.logoutBtn}>
          Logout
        </button>
      </header>

      {liveAlert && <div style={styles.banner}>{liveAlert}</div>}

      <div style={styles.ticketList}>
        <h3>Incoming Ticket Queue</h3>
        {tickets.length === 0 ? (
          <p>No tickets in queue.</p>
        ) : (
          tickets.map((t) => (
            <div key={t.id} style={styles.ticketCard}>
              <div style={styles.ticketHeader}>
                <strong>
                  #{t.id} - {t.title}
                </strong>
                <span
                  style={{
                    ...styles.badge,
                    backgroundColor:
                      t.aiPriority === "HIGH" ? "#dc3545" : "#ffc107",
                  }}
                >
                  AI Priority: {t.aiPriority || "NORMAL"}
                </span>
              </div>
              <p style={styles.desc}>{t.description}</p>
              <small style={styles.meta}>
                Customer Sentiment:{" "}
                <strong>{t.aiSentiment || "Neutral"}</strong> | Status:{" "}
                {t.status}
              </small>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    maxWidth: "800px",
    margin: "0 auto",
    fontFamily: "Arial",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  banner: {
    padding: "10px",
    backgroundColor: "#e2f0d9",
    color: "#385723",
    borderRadius: "4px",
    marginBottom: "15px",
    fontWeight: "bold",
  },
  ticketList: { display: "flex", flexDirection: "column", gap: "10px" },
  ticketCard: {
    background: "#fff",
    padding: "15px",
    borderRadius: "6px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
    borderLeft: "4px solid #007bff",
  },
  ticketHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  badge: {
    padding: "4px 8px",
    borderRadius: "4px",
    color: "#fff",
    fontSize: "12px",
    fontWeight: "bold",
  },
  desc: { margin: "10px 0", color: "#333" },
  meta: { color: "#666" },
  logoutBtn: {
    padding: "6px 12px",
    background: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};
