import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getRole, isAuthenticated } from '../../utils/auth';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { authState } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  
  useEffect(() => {
    const checkAuth = async () => {
      // Simulate API call to verify token
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    };
    
    checkAuth();
  }, []);
  
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  
  if (!isAuthenticated()) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  const userRole = getRole();
  
  if (requiredRole && userRole !== requiredRole) {
    // Redirect to appropriate dashboard based on role
    if (userRole === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (userRole === 'volunteer') {
      return <Navigate to="/volunteer/dashboard" replace />;
    } else if (userRole === 'victim') {
      return <Navigate to="/victim/dashboard" replace />;
    } else {
      // Default fallback to login
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  }
  
  return children;
};

export default ProtectedRoute;