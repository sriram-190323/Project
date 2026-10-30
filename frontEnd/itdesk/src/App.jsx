import React, { useState } from "react";
import Login from "./components/Login";
import CustomerDashboard from "./components/CustomerDashboard";
import AgentDashboard from "./components/AgentDashboard";

export default function App() {
  const [role, setRole] = useState(localStorage.getItem("user_role"));

  const handleLogout = () => {
    localStorage.clear();
    setRole(null);
  };

  if (!role) {
    return <Login onLoginSuccess={(assignedRole) => setRole(assignedRole)} />;
  }

  if (role === "ROLE_AGENT") {
    return <AgentDashboard onLogout={handleLogout} />;
  }

  return <CustomerDashboard onLogout={handleLogout} />;
}
