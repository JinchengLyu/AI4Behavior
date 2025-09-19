import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';

function ProtectedRoute({ children, requiredLevel = 1 }) {
  const { session, userLevel, loading } = useContext(AuthContext);
  console.debug("ProtectedRoute - session:", session, "userLevel:", userLevel, "loading:", loading);

  if (loading) return <div>加载中... (Loading...)</div>;

  if (!session) {
    alert("访问被拒绝。请登录并确保您有足够的权限。(Access denied. Please log in and ensure you have sufficient permissions.)");
    return <Navigate to="/login" />; // 或重定向到申请页面
  }
  if (userLevel < requiredLevel){
    alert("访问被拒绝。您的权限不足。(Access denied. Your permission level is insufficient.)");
    return <Navigate to="/" />; // 或重定向到申请页面
  }

  return children;
}

export default ProtectedRoute;
