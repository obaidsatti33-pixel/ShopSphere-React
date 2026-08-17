import { useState } from "react";

function Signup({ closeSignup, openLogin }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
    setSuccess("");
  }

  function handleSignup(e) {
    e.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim().toLowerCase();
    const password = formData.password;
    const confirmPassword = formData.confirmPassword;

    // Empty fields
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      setSuccess("");
      return;
    }

    // Password length
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setSuccess("");
      return;
    }

    // Password matching
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setSuccess("");
      return;
    }

    // Check existing account
    const existingUser = JSON.parse(
      localStorage.getItem("user")
    );

    if (
      existingUser &&
      existingUser.email.trim().toLowerCase() === email
    ) {
      setError("An account with this email already exists.");
      setSuccess("");
      return;
    }

    // Create user
    const user = {
      name: name,
      email: email,
      password: password,
    };

    // Save user
    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    setError("");
    setSuccess("Account created successfully! 🎉");

    // Open Login after signup
    setTimeout(() => {
      closeSignup();
      openLogin();
    }, 1000);
  }

  return (
    <div className="login-overlay">

      <div className="login-modal signup-modal">

        {/* Close */}

        <button
          className="login-close"
          onClick={closeSignup}
        >
          ✕
        </button>


        {/* Heading */}

        <h2>
          Create Account 🛍️
        </h2>

        <p>
          Join ShopSphere and start shopping
        </p>


        {/* Form */}

        <form onSubmit={handleSignup}>

          {/* Name */}

          <label>
            Full Name
          </label>

          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
          />


          {/* Email */}

          <label>
            Email Address
          </label>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />


          {/* Password */}

          <label>
            Password
          </label>

          <input
            type="password"
            name="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
          />


          {/* Confirm Password */}

          <label>
            Confirm Password
          </label>

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />


          {/* Error */}

          {error && (
            <p className="login-error">
              ⚠️ {error}
            </p>
          )}


          {/* Success */}

          {success && (
            <p className="contact-success">
              ✅ {success}
            </p>
          )}


          {/* Submit */}

          <button
            type="submit"
            className="login-submit"
          >
            Create Account
          </button>

        </form>


        {/* Login */}

        <p className="login-signup">

          Already have an account?

          <span onClick={openLogin}>
            {" "}Login
          </span>

        </p>

      </div>

    </div>
  );
}

export default Signup;