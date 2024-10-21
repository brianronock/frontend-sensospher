/***********************************************************
    src/services/authService.js
/********************************************************************************************************
Purpose:
The `authService.js` handles authentication-related API requests (e.g., login, register, fetching user profile). It is responsible for sending HTTP requests to your backend to authenticate users and manage their sessions.

#Key Functions:
- `loginService(credentials)`: Sends a POST request to `/api/auth/login` to log in a user. It expects the user credentials (email and password) and returns the authentication token and user data upon success.
- `registerService(userData)`: Sends a POST request to `/api/auth/register` to create a new user account. It returns the newly created user’s data along with the authentication token.
- `getProfile()`: Sends a GET request to `/api/users/profile` to retrieve the authenticated user’s profile. The token is added to the request header for authentication.
- `logoutService()`: Clears the authentication token from `localStorage` during logout.

How it integrates:
- This file interacts directly with the `authSlice` and dispatches actions (login, register, and fetch user profile) to manage user authentication state.
********************************************************************************************************/
import axios from 'axios';

// To access from other local network devices...at Home
 //const API_URL = 'http://192.168.0.16:3000/api/auth';  // Auth-related API base URL
 //const USER_API_URL = 'http://192.168.0.16:3000/api/users';  // User-related API base URL
 
 const API_URL = 'http://localhost:3000/api/auth';  // Auth-related API base URL
 const USER_API_URL = 'http://localhost:3000/api/users';  // User-related API base URL

// To access from other HTL local network devices...
// const API_URL = 'http://172.16.97.127:3000/api/auth';  // Auth-related API base URL
// const USER_API_URL = 'http://172.16.97.127:3000/api/users';  // User-related API base URL


// Login user
export const loginService = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;  // Make sure we are returning the response data
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;  // Rethrow error for handling in the calling code
  }
};

// Register user
export const registerService = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;  // Make sure we are returning the response data
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

// Fetch user profile
export const getProfile = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${USER_API_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

// Logout user
export const logoutService = () => {
  localStorage.removeItem('token');
};