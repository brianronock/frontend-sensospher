/***********************************************************
/***********************************************************
    src/routes/PublicdRoute.js
/********************************************************************************************************
Purpose:
- Acts as route guards to control access to specific pages based on the user’s authentication status.


#Key Features:
- Only allows access to routes if the user isn’t authenticated (e.g., Login and Register pages).
- If the user is logged in, they are redirected to the dashboard.

How it integrates:
- The component wrap around other routes in your `App.js` file to ensure that users can only access certain pages if they are logged in or logged out.
********************************************************************************************************/
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