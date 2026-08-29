import { useState } from "react";

function AdminLogin({ onAdminLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      setError("Please fill in all fields.");
      return;
    }

    // Admin credentials
    if (
      cleanEmail === "admin@shopsphere.com" &&
      password === "admin123"
    ) {
      localStorage.setItem("isAdmin", "true");

      setError("");

      onAdminLogin();
      return;
    }

    setError("Invalid admin email or password.");
  }

  return (
    <div className="login-overlay">

      <div className="login-modal">

        <h2>🔐 Admin Login</h2>

        <p>
          Login to ShopSphere Admin Panel
        </p>

        <form onSubmit={handleLogin}>

          <label>
            Admin Email
          </label>

          <input
            type="email"
            placeholder="Enter admin email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
          />

          <label>
            Admin Password
          </label>

          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
          />

          {error && (
            <p className="login-error">
              ⚠️ {error}
            </p>
          )}

          <button
            type="submit"
            className="login-submit"
          >
            🔐 Admin Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default AdminLogin;