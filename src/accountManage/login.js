import React, { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { supabase } from '../supabaseClient';

function Login() {
  const { session } = useContext(AuthContext); // 从Context获取session
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  // 如果已登录，显示已登录内容
  if (session) {
    return (
      <div>
        <h2>已登录！用户邮箱: {session.user.email}</h2>
        <button onClick={() => supabase.auth.signOut()}>注销 (Logout)</button>
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
      alert('登录失败：' + error.message);
    } else {
      alert('登录成功！'); // Context会自动更新session
    }
  };

  return (
    <div style={{ maxWidth: '300px', margin: 'auto', padding: '20px' }}>
      <h2>登录页面 (Login Page)</h2>
      {error && <p style={{ color: 'red' }}>错误：{error}</p>}
      <form onSubmit={handleSubmit}>
        {/* ... 表单内容同之前 ... */}
      </form>
    </div>
  );
}

export default Login;
