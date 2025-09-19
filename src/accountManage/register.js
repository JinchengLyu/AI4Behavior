import React, { useState } from "react";
import { supabase } from "../supabaseClient"; // Import Supabase client
import { useNavigate } from "react-router-dom"; // If using routing, used for redirects (optional)

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirm password
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate(); // Used for redirects (if React Router is installed)

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    // Basic validation: passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // Use Supabase signUp method to register
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      setError(error.message);
      alert("Registration failed: " + error.message);
    } else {
      await supabase.from("user_levels").insert({
        user_id: data.user.id,
        level: 0,
      });
      setSuccess(true);
      alert("Registration successful! Please check your email to confirm your account.");
      // Optional: redirect to login page
      navigate("/login");
    }
  };

  return (
    <div style={{ maxWidth: "300px", margin: "auto", padding: "20px" }}>
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {success && <p style={{ color: "green" }}>Registration successful! Please verify your email.</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6} // Minimum length (Supabase typically requires)
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <a href="/login">Go to Login</a>
      </p>
    </div>
  );
}

export default Register;
