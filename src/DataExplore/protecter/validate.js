import React, { useState } from "react";
// import './ValidatePasscode.css';
import { BACKEND } from "../../consts";
import DBFilter from "../Filter/DBFilterPage";

function ValidatePasscode() {
  const [userId, setUserId] = useState("");
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [isValidated, setIsValidated] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult("");
    setError("");
    setIsValidated(false);

    if (!userId.trim() || !code.trim()) {
      setError("Please enter both User ID and Passcode");
      return;
    }

    try {
      const response = await fetch(BACKEND + "/api/validate-passcode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, code }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setResult("Validation successful!");
        setIsValidated(true);
      } else {
        setError(`Error: ${data.error}`);
      }
    } catch (err) {
      setError(`Network Error: ${err.message}`);
    }
  };

  return (
    <div className="container">
      {isValidated && (
        <>
          <h2>Validate Passcode</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                placeholder="Enter User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Enter Passcode"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
            <button type="submit">Submit</button>
          </form>
          <div style={{ marginTop: "16px" }}>
            <a href="/requestPasscode">request passcode</a>
          </div>
        </>
      )}

      {!isValidated && <DBFilter />}
    </div>
  );
}

export default ValidatePasscode;
