// src/components/ApplicationsAdmin.js (assumed path)
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "./AuthContext"; // Your AuthContext file path
import { supabase } from "./supabaseClient"; // Import supabase client
import ProtectedRoute from "./protecter/validate"; // Keep existing ProtectedRoute

/**
 * Admin page: Applications Review
 */
export default function ApplicationsAdmin() {
  const { session, userLevel } = useContext(AuthContext); // Get session and userLevel

  // State
  const [apps, setApps] = useState([]);
  const [loadingApps, setLoadingApps] = useState(true);
  const [message, setMessage] = useState(""); // success/error message
  const [isSuccess, setIsSuccess] = useState(false);

  // Load applications from Supabase
  useEffect(() => {
    if (!session || userLevel < 5) return; // Ensure authentication and authorization

    (async () => {
      try {
        setLoadingApps(true);
        const { data, error } = await supabase
          .from("account_applications")
          .select("*") // select all fields
          .eq("status", "pending") // only show pending
          .order("created_at", { ascending: false }); // newest first

        if (error) throw error;
        setApps(data || []);
      } catch (e) {
        setMessage(e.message || "Failed to load applications");
        setIsSuccess(false);
      } finally {
        setLoadingApps(false);
      }
    })();
  }, [session, userLevel]);

  // Generate a random password (for development; in production, use secure method)
  const generateRandomPassword = () => {
    // Use Web Crypto API for browser compatibility
    const array = new Uint8Array(16);
    window.crypto.getRandomValues(array);
    return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
  };

  // Approve application: create new user, set level=1 in user_level, update status='approved'
  const onApprove = async (applicationId, email) => {
    try {
      // Generate a random password (WARNING: For demo only; send via email in production)
      const password = generateRandomPassword();

      // Create new user via Supabase Auth
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (signUpError) throw signUpError;
      if (!signUpData.user) throw new Error("User creation failed");

      const newUserId = signUpData.user.id;

      // Insert into user_level table with level=1
      const { error: levelError } = await supabase
        .from("user_level")
        .insert([
          {
            id: crypto.randomUUID(), // Generate UUID (adjust if your table uses different method)
            user_id: newUserId,
            level: 1,
            created_at: new Date().toISOString(),
          },
        ]);

      if (levelError) throw levelError;

      // Update the account_applications table
      const { error: updateError } = await supabase
        .from("account_applications")
        .update({ status: "approved", updated_at: new Date().toISOString() })
        .eq("id", applicationId);

      if (updateError) throw updateError;

      setMessage(`User created for ${email} with Level 1. Temporary password: ${password} (Send this securely to the user)`);
      setIsSuccess(true);

      // Refresh list (remove approved)
      const { data } = await supabase
        .from("account_applications")
        .select("*")
        .eq("status", "pending");
      setApps(data || []);
    } catch (e) {
      console.debug(e);
      setMessage(e.message || "Failed to approve");
      setIsSuccess(false);
    }
  };

  return (
    <ProtectedRoute requiredLevel={5}>
      <div
        style={{
          padding: 16,
          maxWidth: 760,
          margin: "0 auto",
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial",
        }}
      >
        <h2>Applications Review</h2>

        {message && (
          <div style={{ color: isSuccess ? "green" : "red", marginBottom: 12 }}>
            {message}
          </div>
        )}

        <h3 style={{ marginTop: 24 }}>Pending Applications</h3>
        {loadingApps ? (
          <div>Loading...</div>
        ) : (
          <div
            style={{
              border: "1px solid #e5e5e5",
              borderRadius: 6,
              overflow: "hidden",
            }}
          >
            {apps.length === 0 ? (
              <div style={{ padding: 12, color: "#666" }}>No Data</div>
            ) : (
              apps.map((app, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: 10,
                    borderBottom: "1px solid #f0f0f0",
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div>
                      <b>{app.name || "-"}</b> - {app.email || "-"}
                    </div>
                    <div style={{ fontSize: 12, color: "#666" }}>
                      purpose: {app.purpose || "-"}
                    </div>
                    <div style={{ fontSize: 12, color: "#666" }}>
                      createdAt:{" "}
                      {app.created_at
                        ? new Date(app.created_at).toLocaleString()
                        : "-"}
                    </div>
                  </div>
                  <button onClick={() => onApprove(app.id, app.email)}>
                    Approve
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
