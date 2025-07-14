import React, { useState } from 'react';
// import './RequestPasscode.css';
import { BACKEND } from '../../consts';
import ApplicationForm from './application';

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
    <ApplicationForm/>
  );
}

export default RequestPasscode;
