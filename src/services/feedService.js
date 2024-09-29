/***********************************************************
 * feedService.js
 * Handles API requests for fetching and managing live feed.
 ***********************************************************/
import axios from 'axios'

// const API_URL = 'http://192.168.0.16:3000/api/feed'
const API_URL = 'http://localhost:3000/api/feed'

// Helper function to get the Authorization headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token')  // Retrieve token from local storage
  return {
    Authorization: `Bearer ${token}`,  // Add Authorization header with Bearer token
  }
}

// Fetch all posts with Authorization header
export const fetchPostsService = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: getAuthHeaders(),
    })
    return response.data
  } catch (error) {
    console.error('Error fetching posts:', error)
    throw error
  }
}

// Create a new post
export const createPostService = async (postData) => {
  try {
    const response = await axios.post(API_URL, postData, {
      headers: getAuthHeaders(),
    })
    return response.data
  } catch (error) {
    if(error.response){
    console.error('Error creating post:', error.response.data)
  } else {
    console.error('Error creating post:', error.message)
  }
    throw error
  }
}

// Delete a post
export const deletePostService = async (postId) => {
  try {
    await axios.delete(`${API_URL}/${postId}`, {
      headers: getAuthHeaders(),
    })
  } catch (error) {
    console.error('Error deleting post:', error)
    throw error
  }
}

// Update an existing post
export const updatePostService = async (postId, updatedContent) => {
  try {
    const response = await axios.put(`${API_URL}/${postId}`, { content: updatedContent }, {
      headers: getAuthHeaders(),
    })
    return response.data
  } catch (error) {
    console.error('Error updating post:', error)
    throw error
  }
}

// Like a post
export const likePostService = async (postId) => {
  try {
    const response = await axios.post(`${API_URL}/${postId}/like`, {}, {
      headers: getAuthHeaders(),
    })
    return response.data
  } catch (error) {
    console.error('Error liking post:', error)
    throw error
  }
}