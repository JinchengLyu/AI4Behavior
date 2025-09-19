import React, { useState } from 'react';
import './RequestPasscode.css'; // 取消注释，导入 CSS
import { BACKEND } from '../consts';
import ApplicationForm from './application'; // 假设这是渲染表单的组件

function RequestPasscode() {
  const [userId, setUserId] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult('');
    setError('');

    if (!userId.trim()) {
      setError('Please enter a User ID');
      return;
    }

    try {
      const response = await fetch(BACKEND + '/api/generate-passcode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      const data = await response.json();
      if (response.ok) {
        setResult(`Your Passcode is: ${data.passcode}`);
      } else {
        setError(`Error: ${data.error}`);
      }
    } catch (err) {
      setError(`Network Error: ${err.message}`);
    }
  };

  return (
    <div className="page-container">
      <main className="form-container">
        {/* 渲染 ApplicationForm 组件，如果它包含表单逻辑 */}
        <ApplicationForm onSubmit={handleSubmit} /> {/* 如果 ApplicationForm 需要 handleSubmit，可以传递 props */}
        
        {/* 显示结果或错误（基于您的 state） */}
        {result && <p className="result">{result}</p>}
        {error && <p className="error">{error}</p>}
      </main>
    </div>
  );
}

export default RequestPasscode;
