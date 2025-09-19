import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';

function ProtectedRoute({ children, requiredLevel = 1 }) {
  const { session, userLevel, loading } = useContext(AuthContext);
  console.debug("ProtectedRoute - session:", session, "userLevel:", userLevel, "loading:", loading);

  if (loading) return <div>Loading...</div>;

  if (!session) {
    alert("Access denied. Please log in and ensure you have sufficient permissions.");
    return <Navigate to="/login" />; // or redirect to an access request page
  }
  if (userLevel < requiredLevel){
    alert("Access denied. Your permission level is insufficient.");
    return <Navigate to="/" />; // or redirect to an access request page
  }

  return children;
}

export default ProtectedRoute;
