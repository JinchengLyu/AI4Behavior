import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { supabase } from "../supabaseClient";

function Login() {
  const { session, setSession, setUserLevel } = useContext(AuthContext); // 从Context获取session
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // 如果已登录，显示已登录内容
  if (session) {
    console.debug("User is logged in:", session);
    return (
      <div>
        <h2>Logged in as: {session.user.email}</h2>
        <button
          onClick={() => {
            supabase.auth.signOut();
            setSession(null);
            setUserLevel(0);
            setEmail("");
            setPassword("");
            alert("Logged out successfully!");
            setTimeout(() => {
              navigate(0);
            }, 5000);
          }}
        >
          Logout
        </button>
      </div>
    );
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setError(error.message);
      alert("Login failed: " + error.message);
    } else {
      alert("Login successful!"); // Context会自动更新session
      window.location.reload(); // 刷新页面以更新状态
    }
  };

  return (
    <div style={{ maxWidth: "300px", margin: "auto", padding: "20px" }}>
      <h2>Login Page</h2>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
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
            minLength={6} // 最小长度（Supabase默认要求）
          />
        </div>
        <button type="submit">Login</button>
      </form>

      <Link to="/register">Don't have an account? Register here.</Link>
    </div>
  );
}

export default Login;
