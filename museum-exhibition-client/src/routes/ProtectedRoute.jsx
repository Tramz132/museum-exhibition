import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useApp from '../hooks/useApp';

const ProtectedRoute = ({ allowedRoles }) => {
  const { currentUser } = useApp();

  // 1. If not logged in, force redirect to Login
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // 2. If logged in but role is unauthorized, redirect to their default dashboard
  if (!allowedRoles.includes(currentUser.role)) {
    if (currentUser.role === 'PANITIA') {
      return <Navigate to="/panitia" replace />;
    }
    if (currentUser.role === 'STAF') {
      return <Navigate to="/staf" replace />;
    }
    if (currentUser.role === 'ADMIN') {
      return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/login" replace />;
  }

  // 3. Authorized - render layout sub-page routes
  return <Outlet />;
};

export default ProtectedRoute;
