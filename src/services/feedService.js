/***********************************************************
 * feedService.js
 * Handles API requests for fetching and managing live feed.
 ***********************************************************/
import axios from 'axios';

// const API_URL = 'http://192.168.0.16:3000/api/feed';
 const API_URL = 'http://localhost:3000/api/feed';


// Fetch all posts with Authorization header
export const fetchPostsService = async () => {
  try {
    const token = localStorage.getItem('token');  // Retrieve token from local storage
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,  // Add Authorization header with Bearer token
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

// Create a new post
export const createPostService = async (postData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(API_URL, postData, {
      headers: {
        Authorization: `Bearer ${token}`,  // Add Authorization header
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};