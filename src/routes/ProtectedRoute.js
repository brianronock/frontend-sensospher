/***********************************************************
 * ProtectedRoute.js
 * A wrapper around React Router's Route to ensure the user
 * is authenticated before accessing certain routes.
 ***********************************************************/
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';  // Assuming you're using Redux for auth state

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  // If the user is not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Otherwise, render the component
  return children;
};

export default ProtectedRoute;