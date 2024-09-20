/***********************************************************
 * PublicRoute.js
 * A wrapper around React Router's Route to redirect users
 * if they're already authenticated.
 ***********************************************************/
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  // If the user is authenticated, redirect to the dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  // Otherwise, render the public component
  return children;
};

export default PublicRoute;