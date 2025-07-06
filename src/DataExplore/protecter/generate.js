import React, { useState } from 'react';
// import './RequestPasscode.css';
import { BACKEND } from '../../consts';

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
      const response = await fetch(BACKEND+'/api/generate-passcode', {
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
    <div className="container">
      <h2>Request a Passcode</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Enter User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {result && <div className="result">{result}</div>}
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default RequestPasscode;
