/***********************************************************
    src/services/feedService.js
/********************************************************************************************************
Purpose:
The `feedService.js` handles API requests for the live feed 
(e.g., fetching, creating, updating, deleting posts, and liking posts). 
It provides the functions that allow your frontend to interact with the backend.

#Key Functions:
- `fetchPostsService()`: Sends a GET request to fetch all posts from the live feed. 
                          The `Authorization` header is included for authentication.
- `createPostService(postData)`: Sends a POST request to create a new post. The post data (content) is passed in the body.
- `deletePostService(postId)`: Sends a DELETE request to remove a post by its ID.
- `updatePostService(postId, updatedContent)`: Sends a PUT request to update an existing post's content.
- `likePostService(postId)`: Sends a POST request to like or unlike a post.

How it integrates:
- This file is connected to the `feedSlice.js` in your Redux store, and it helps manage state changes related to live feed posts by dispatching relevant actions.
********************************************************************************************************/
import axios from 'axios'

// const API_URL = 'http://192.168.0.16:3000/api/feed' // Home Local network Devices
// const API_URL = 'http://172.16.97.127:3000/api/feed'; // HTL Wien West Network
const API_URL = 'http://localhost:3000/api/addFeed' // Beta version

// const API_URL = 'http://localhost:3000/api/feed'

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