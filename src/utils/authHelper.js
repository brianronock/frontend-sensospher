/***********************************************************
 * authHelper.js
 * Helper functions for managing authentication-related tasks.
 ***********************************************************/
export const getToken = () => {
    return localStorage.getItem('token');
  };
  
  // Check if user is authenticated by looking for a token
  export const isAuthenticated = () => {
    const token = getToken();
    return !!token;  // Returns true if token exists, false otherwise
  };
  
  // Save user token in local storage
  export const saveToken = (token) => {
    localStorage.setItem('token', token);
  };
  
  // Clear user token from local storage (logout)
  export const clearToken = () => {
    localStorage.removeItem('token');
  };