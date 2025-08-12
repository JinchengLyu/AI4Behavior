import React, { useState } from "react";
import "./ValidatePasscode.css"; // 取消注释，导入 CSS
import { BACKEND } from "../../consts";
import { Link } from "react-router-dom"; // 可选：如果使用 React Router；否则用 <a>
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
    <>
      {!isValidated && (
        <div className="page-container">
          <div className="validate-form-container">
            <>
              <h2>Validate Passcode</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Enter User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Enter Passcode"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="form-input"
                  />
                </div>
                <button type="submit" className="submit-button">
                  Submit
                </button>
              </form>
              <div className="request-link">
                <Link to="/requestPasscode">request passcode</Link>{" "}
                {/* 使用 Link 如果有 Router；否则用 <a href="/requestPasscode">request passcode</a> */}
              </div>
              {result && <p className="success-message">{result}</p>}
              {error && <p className="error-message">{error}</p>}
            </>
          </div>
        </div>
      )}
      {isValidated && <DBFilter />}
    </>
  );
}

export default ValidatePasscode;
