// src/components/ApplicationForm.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Used for optional redirects (e.g., back to home)
import { supabase } from "../supabaseClient"; // Import supabase client

const ApplicationForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    purpose: "",
    disclaimerAgreed: false,
  });

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsSuccess(false);

    if (!formData.disclaimerAgreed) {
      setMessage("You must agree to the disclaimer.");
      return;
    }
    if (!formData.name || !formData.email || !formData.purpose) {
      setMessage("Please fill in all required fields.");
      return;
    }
    // Basic email validation (optional)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    try {
      // Insert data into the 'account_applications' table
      // Only insert matching fields: name, email, purpose
      // status, created_at, updated_at use defaults
      const { data, error } = await supabase
        .from("account_applications") // Your table name
        .insert([
          {
            name: formData.name,
            email: formData.email,
            purpose: formData.purpose,
            // No 'reason' field, as per your table schema
            // status: 'pending' // Not necessary, uses default
          },
        ]);

      if (error) {
        throw error; // Supabase error handling
      }

      setMessage(
        "Application submitted successfully! An administrator will review your request and create your account with Level 1 access if approved."
      );
      setIsSuccess(true);
      setFormData({
        name: "",
        email: "",
        purpose: "",
        disclaimerAgreed: false,
      });
    } catch (error) {
      setMessage(
        "Error submitting application: " + (error.message || "Unknown error")
      );
      setIsSuccess(false);
    }
  };

  return (
    <div className="application-form-container">
      <h2>Account Application Form</h2>
      <p>
        Apply for a new account. If approved, your account will be created with Level 1 access.
      </p>
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
            I agree to the Data Usage Disclaimer: The dataset is for
            non-commercial research use only. I will not use it for any
            commercial purposes and take full responsibility for its ethical
            usage. [{" "}
            <a href="/disclaimer" target="_blank">
              View full disclaimer
            </a>{" "}
            ]
          </label>
        </div>
        <button type="submit" className="submit-button">
          Submit Application
        </button>
      </form>
      {message && (
        <p className={isSuccess ? "success-message" : "error-message"}>
          {message}
        </p>
      )}
      <button onClick={() => navigate("/")} className="back-button">
        Back to Home
      </button>
    </div>
  );
};

export default ApplicationForm;
