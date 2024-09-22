/***********************************************************
 * authService.js
 * Handles authentication-related API requests (login, register).
 ***********************************************************/
import axios from 'axios';

// const API_URL = 'http://192.168.0.16:3000/api/auth';  // Auth-related API base URL
// const USER_API_URL = 'http://192.168.0.16:3000/api/users';  // User-related API base URL
const API_URL = 'http://localhost:3000/api/auth';  // Auth-related API base URL
const USER_API_URL = 'http://localhost:3000/api/users';  // User-related API base URL


// Login user
export const loginService = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;  // Make sure you're returning the response data
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;  // Rethrow error for handling in the calling code
  }
};

// Register user
export const registerService = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;  // Make sure you're returning the response data
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