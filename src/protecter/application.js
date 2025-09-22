// src/components/ApplicationForm.js
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // used for redirects (if not logged in)
import { AuthContext } from "../AuthContext"; // Your AuthContext file path
import { supabase } from "../supabaseClient"; // import supabase client

const ApplicationForm = () => {
  const { session, userLevel, loading } = useContext(AuthContext); // Get session, userLevel and loading from Context
  const navigate = useNavigate();

  // Pre-fill email from session (if available)
  const initialEmail = session.user?.email || "";

  const [formData, setFormData] = useState({
    name: "",
    email: initialEmail,
    purpose: "",
    disclaimerAgreed: false,
  });

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Handle loading state
  if (loading) {
    return (
      <div className="application-form-container">
        <h2>Loading...</h2>
        <p>Retrieving authentication information, please wait.</p>
      </div>
    );
  }

  // If not logged in, redirect to login page
  if (!session) {
    navigate("/login"); // assume login route is /login
    return null; // prevent form rendering
  }

  // Show different content based on userLevel (e.g., if userLevel >= 5, access already granted)
  // Note: threshold 5 is assumed; adjust according to your implementation
  if (userLevel >= 5) {
    return (
      <div className="application-form-container">
        <h2>Application Form</h2>
        <p>
          Your user level is {userLevel}. You do not need to apply for a
          passcode. You already have access.
        </p>
        <button onClick={() => navigate("/")} className="back-button">
          Back to Home
        </button>
      </div>
    );
  }

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

    try {
      // Format reason field: combine name, email, purpose into a string
      const formattedReason = `Name: ${formData.name}\nEmail: ${formData.email}\nPurpose: ${formData.purpose}`;

      // Insert data directly into the 'applications' table
      // Insert matching fields only: user_id, reason (status uses default 'pending')
      // created_at/updated_at: auto-generated
      const { data, error } = await supabase
        .from("user_level_application") // your table name
        .insert([
          {
            user_id: session.user.id, // from session
            reason: formattedReason, // combined form data
            // status: 'pending' // not necessary if default is set
          },
        ]);

      if (error) {
        throw error; // Supabase error handling
      }

      setMessage(
        "Application submitted successfully! We will review and update your user level if approved."
      );
      setIsSuccess(true);
      setFormData({
        name: "",
        email: initialEmail,
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
      <h2>Application Form for Passcode</h2>
      <p>
        Current User Level: {userLevel}. You may apply to request elevated access.
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
          Submit
        </button>
      </form>
      {message && (
        <p className={isSuccess ? "success-message" : "error-message"}>
          {message}
        </p>
      )}
    </div>
  );
};

export default ApplicationForm;