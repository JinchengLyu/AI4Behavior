import React, { useState } from 'react';
import { supabase } from '../supabaseClient'; // 导入Supabase客户端

function Login() {
  const [email, setEmail] = useState(''); // 使用邮箱代替用户名
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // 错误状态

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // 清空错误

    // 使用Supabase的signInWithPassword进行登录
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setError(error.message); // 显示错误
      alert('登录失败：' + error.message);
    } else {
      alert('登录成功！'); // 可以存储session或跳转
      console.log('用户数据：', data.user); // data包含用户session
      // 示例：存储access_token到localStorage（不推荐生产环境，使用更安全的存储）
      // localStorage.setItem('supabase.auth.token', data.session.access_token);
    }
  };

  return (
    <div style={{ maxWidth: '300px', margin: 'auto', padding: '20px' }}>
      <h2>登录页面 (Login Page)</h2>
      {error && <p style={{ color: 'red' }}>错误：{error}</p>}
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
          />
        </div>
        <button type="submit">登录 (Login)</button>
      </form>
    </div>
  );
}

export default Login;
