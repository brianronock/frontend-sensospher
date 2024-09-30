/***********************************************************
    src/routes/ProtectedRoute.js
/********************************************************************************************************
Purpose:
- Acts as route guards to control access to specific pages based on the user’s authentication status.


#Key Features:
- Only allows access to routes if the user is authenticated.
- If the user isn’t logged in, they are redirected to the login page.

How it integrates:
- The component wrap around other routes in your `App.js` file to ensure that users can only access certain pages if they are logged in or logged out.
********************************************************************************************************/
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; 

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