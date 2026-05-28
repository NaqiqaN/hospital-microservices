import { useState } from "react";

function Login({ onLogin, onShowRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    setError("");

    fetch("http://localhost:8081/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    })
      .then((response) => response.text())
      .then((data) => {
        if (
          data.toLowerCase().includes("invalid") ||
          data.toLowerCase().includes("failed") ||
          data.toLowerCase().includes("not found") ||
          data.trim() === ""
        ) {
          setError(data || "Login failed");
          return;
        }

        localStorage.setItem("token", data);
        onLogin();
      })
      .catch((error) => {
        console.log("Login error:", error);
        setError("Login failed. Make sure auth-service is running on port 8081.");
      });
  }

  return (
    <div className="auth-page">
      <div className="auth-glow auth-glow-one" />
      <div className="auth-glow auth-glow-two" />

      <div className="auth-card">
        <p className="auth-eyebrow">Secure Hospital Access</p>
        <h1>Chiron Hospital</h1>
        <p className="auth-subtitle">Login to manage appointments, doctors, billing, and patient records.</p>

        <form onSubmit={handleLogin} className="auth-form">
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

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-primary-btn">Login</button>
        </form>

        <p className="auth-switch-text">
          No account?{" "}
          <button type="button" className="auth-link-btn" onClick={onShowRegister}>
            Register
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;