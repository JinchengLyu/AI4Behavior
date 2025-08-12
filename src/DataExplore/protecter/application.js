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
  const [isSuccess, setIsSuccess] = useState(false); // 新增：区分成功/错误消息

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsSuccess(false);

    if (!formData.disclaimerAgreed) {
      setMessage('You must agree to the disclaimer.');
      return;
    }
    if (!formData.name || !formData.email || !formData.purpose) {
      setMessage('Please fill in all required fields.');
      return;
    }

    try {
      const response = await fetch(BACKEND + '/api/applications', {
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
      setIsSuccess(true);
      setFormData({ name: '', email: '', purpose: '', disclaimerAgreed: false });
    } catch (error) {
      setMessage('Error submitting application.');
      setIsSuccess(false);
    }
  };

  return (
    <div className="application-form-container">
      <h2>Application Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="purpose">Purpose of using data:</label>
          <textarea
            id="purpose"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            required
            className="form-textarea"
          />
        </div>
        <div className="form-group checkbox-group">
          <input
            id="disclaimer"
            type="checkbox"
            name="disclaimerAgreed"
            checked={formData.disclaimerAgreed}
            onChange={handleChange}
            className="form-checkbox"
          />
          <label htmlFor="disclaimer">
            I agree to the disclaimer: Data will be used responsibly, and I take full responsibility for its usage.
          </label>
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
      {message && <p className={isSuccess ? 'success-message' : 'error-message'}>{message}</p>}
    </div>
  );
};

export default ApplicationForm;
