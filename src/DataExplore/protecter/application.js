// src/components/ApplicationForm.js
import React, { useState } from 'react';
import { BACKEND } from '../../consts';

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    purpose: '',
    disclaimerAgreed: false,
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.disclaimerAgreed) {
      setMessage('You must agree to the disclaimer.');
      return;
    }
    try {
      const response = await fetch(BACKEND+'/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setMessage('Application submitted successfully!');
      setFormData({ name: '', email: '', purpose: '', disclaimerAgreed: false });
    } catch (error) {
      setMessage('Error submitting application.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h2>Application Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Purpose of using data:</label>
          <textarea
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="checkbox"
            name="disclaimerAgreed"
            checked={formData.disclaimerAgreed}
            onChange={handleChange}
          />
          <label>I agree to the disclaimer: Data will be used responsibly, and I take full responsibility for its usage.</label>
        </div>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ApplicationForm;
