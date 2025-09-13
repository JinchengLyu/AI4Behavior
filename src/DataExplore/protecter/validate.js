import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';

function ProtectedRoute({ children, requiredLevel = 1 }) {
  const { session, userLevel, loading } = useContext(AuthContext);

  if (loading) return <div>加载中... (Loading...)</div>;

  if (!session || userLevel < requiredLevel) {
    return <Navigate to="/login" />; // 或重定向到申请页面
  }

  return children;
}

export default ProtectedRoute;
