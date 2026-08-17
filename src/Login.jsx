import { useState } from "react";

function Login({ closeLogin, openSignup }) {
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

  const savedUser = JSON.parse(
    localStorage.getItem("user")
  );

  if (!savedUser) {
    setError("No account found. Please sign up first.");
    return;
  }

  const savedEmail = savedUser.email
    .trim()
    .toLowerCase();

  if (
    cleanEmail !== savedEmail ||
    password !== savedUser.password
  ) {
    setError("Invalid email or password.");
    return;
  }

  localStorage.setItem(
    "loggedInUser",
    JSON.stringify(savedUser)
  );

  setError("");

  alert(`✅ Welcome ${savedUser.name}!`);

  closeLogin();
}

  return (
    <div className="login-overlay">

      <div className="login-modal">

        <button
          className="login-close"
          onClick={closeLogin}
        >
          ✕
        </button>

        <h2>Welcome Back 👋</h2>

        <p>
          Login to your ShopSphere account
        </p>

        <form onSubmit={handleLogin}>

          <label>
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
          />

          <label>
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
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
            🔐 Login
          </button>

        </form>

        <p className="login-signup">
          Don't have an account?

          <span onClick={openSignup}>
            {" "}Sign Up
          </span>
        </p>

      </div>

    </div>
  );
}

export default Login;