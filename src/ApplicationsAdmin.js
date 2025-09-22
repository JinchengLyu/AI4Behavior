// src/components/ApplicationsAdmin.js (assumed path)
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "./AuthContext"; // Your AuthContext file path
import { supabase } from "./supabaseClient"; // Import supabase client
import ProtectedRoute from "./protecter/validate"; // Keep existing ProtectedRoute

/**
 * Parse reason field into an object
 * Assumes format: "Name: John Doe\nEmail: john@example.com\nPurpose: Research"
 */
function parseReason(reason) {
  if (!reason) return { name: "-", email: "-", purpose: "-" };
  const lines = reason.split("\n");
  const parsed = {};
  lines.forEach((line) => {
    const [key, value] = line.split(": ").map((str) => str.trim());
    if (key && value) parsed[key.toLowerCase()] = value;
  });
  return {
    name: parsed.name || "-",
    email: parsed.email || "-",
    purpose: parsed.purpose || "-",
  };
}

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
          .from("user_level_application")
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

  // Approve application: set level=1 and update status='approved'
  const onApprove = async (userId) => {
    try {
      // Call stored procedure to update level=1
      const { data: levelData, error: levelError } = await supabase.rpc(
        "manage_user_level",
        { target_user_id: userId, action: "update", new_level: 1 }
      );

      if (levelError) throw levelError;
      if (!levelData || levelData.status !== "updated")
        throw new Error("Level update failed");

      // Then update the user_level_application table (direct update, if RLS allows)
      const { error: updateError } = await supabase
        .from("user_level_application")
        .update({ status: "approved", updated_at: new Date().toISOString() })
        .eq("user_id", userId);

      if (updateError) throw updateError;

      setMessage(`User ${userId} approved, level set to 1`);
      setIsSuccess(true);

      // Refresh list (remove approved)
      const { data } = await supabase
        .from("user_level_application")
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
              apps.map((app, idx) => {
                const { name, email, purpose } = parseReason(app.reason);
                return (
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
                        <b>{name}</b> - {email}
                      </div>
                      <div style={{ fontSize: 12, color: "#666" }}>
                        purpose: {purpose} | agreed: true {/* fixed as true */}
                      </div>
                      <div style={{ fontSize: 12, color: "#666" }}>
                        createdAt:{" "}
                        {app.created_at
                          ? new Date(app.created_at).toLocaleString()
                          : "-"}
                      </div>
                    </div>
                    <button onClick={() => onApprove(app.user_id)}>
                      Approve
                    </button>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
