import { useState } from "react";

function Register({ onShowLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [message, setMessage] = useState("");

  function handleRegister(e) {
    e.preventDefault();

    fetch("http://localhost:8081/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password,
        role
      })
    })
      .then((response) => response.text())
      .then((data) => {
        setMessage(data);

        if (data.toLowerCase().includes("success")) {
          setTimeout(() => {
            onShowLogin();
          }, 1200);
        }
      })
      .catch((error) => {
        console.log("Register error:", error);
        setMessage("Registration failed");
      });
  }

  return (
    <div className="auth-page">
      <div className="auth-glow auth-glow-one" />
      <div className="auth-glow auth-glow-two" />

      <div className="auth-card">
        <p className="auth-eyebrow">Hospital Enterprise Access</p>
        <h1>Create Account</h1>
        <p className="auth-subtitle">Register a secure account for the Chiron Hospital Management System.</p>

        <form onSubmit={handleRegister} className="auth-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>

          {message && <p className="auth-success">{message}</p>}

          <button type="submit" className="auth-primary-btn">
            Register
          </button>
        </form>

        <p className="auth-switch-text">
          Already have an account?{" "}
          <button type="button" className="auth-link-btn" onClick={onShowLogin}>
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;