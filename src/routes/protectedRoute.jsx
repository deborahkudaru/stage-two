import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { session } = useContext(AuthContext);
  if (!session || session.exp <= Date.now()) {
    localStorage.removeItem('ticketapp_session');
    return <Navigate to="/auth/login?m=session_expired" replace />;
  }
  return <Outlet />;
}

export default ProtectedRoute;