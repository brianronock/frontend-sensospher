/***********************************************************
    src/utils/authHelper.js
/********************************************************************************************************
Purpose:
The `authHelper.js` contains utility functions to handle authentication tasks (e.g., managing tokens).

#Key Functions:
- `getToken()`: Retrieves the JWT token from localStorage.
- `isAuthenticated()`: Checks if a user is authenticated by looking for the token.
- `saveToken(token)`: Saves the authentication token to localStorage after login or registration.
- `clearToken()`: Clears the authentication token from localStorage (used during logout).

How it integrates:
- This helper works with `authService.js` and the `authSlice.js` to manage the token lifecycle and ensure that the app knows when a user is logged in or out.
********************************************************************************************************/
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