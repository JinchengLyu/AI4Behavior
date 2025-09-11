import React, { useState } from 'react';
import { supabase } from '../supabaseClient'; // 导入Supabase客户端
import { useNavigate } from 'react-router-dom'; // 如果使用路由，用于重定向（可选）

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // 确认密码
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate(); // 用于重定向（如果已安装React Router）

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    // 简单验证：密码匹配
    if (password !== confirmPassword) {
      setError('密码不匹配！');
      return;
    }

    // 使用Supabase的signUp方法注册
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      setError(error.message);
      alert('注册失败：' + error.message);
    } else {
      setSuccess(true);
      alert('注册成功！请检查您的邮箱以确认账户。');
      // 可选：重定向到登录页面
      navigate('/login');
    }
  };

  return (
    <div style={{ maxWidth: '300px', margin: 'auto', padding: '20px' }}>
      <h2>注册页面 (Register Page)</h2>
      {error && <p style={{ color: 'red' }}>错误：{error}</p>}
      {success && <p style={{ color: 'green' }}>注册成功！请验证您的邮箱。</p>}
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
        <div>
          <label>确认密码 (Confirm Password):</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">注册 (Register)</button>
      </form>
      <p>已有账户？<a href="/login">去登录 (Go to Login)</a></p>
    </div>
  );
}

export default Register;
