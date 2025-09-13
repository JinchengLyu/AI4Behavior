import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { supabase } from "../supabaseClient";

function Login() {
  const { session } = useContext(AuthContext); // 从Context获取session
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // 如果已登录，显示已登录内容
  if (session) {
    console.debug("User is logged in:", session);
    return (
      <div>
        <h2>已登录！用户邮箱: {session.user.email}</h2>
        <button
          onClick={() => {
            supabase.auth.signOut();
            setEmail("");
            setPassword("");
            navigate(0);
          }}
        >
          注销 (Logout)
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
      alert("登录失败：" + error.message);
    } else {
      alert("登录成功！"); // Context会自动更新session
      navigate("/"); // 重定向到主页
    }
  };

  return (
    <div style={{ maxWidth: "300px", margin: "auto", padding: "20px" }}>
      <h2>登录页面 (Login Page)</h2>
      {error && <p style={{ color: "red" }}>错误：{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>邮箱 (Email):</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>密码 (Password):</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6} // 最小长度（Supabase默认要求）
          />
        </div>
        <button type="submit"> login</button>
      </form>
    </div>
  );
}

export default Login;
