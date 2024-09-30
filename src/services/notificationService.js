/***********************************************************
    src/services/notificationService.js
/********************************************************************************************************
Purpose:
The `notificationService.js` handles API requests for notifications. While it's not fully integrated yet (as seen in your previous prompts), it's designed to allow users to receive and manage notifications.

#Key Functions:
- `fetchNotificationsService()`: Sends a GET request to fetch all notifications.
- `markAsReadService(notificationId)`: Sends a PUT request to mark a specific notification as read.

How it integrates:
- This service could later integrate with the `notificationSlice.js` to manage notifications in the frontend.
********************************************************************************************************/
import axios from 'axios'

const API_URL = '/api/notifications'  // Base URL for notifications

// Fetch notifications
export const fetchNotificationsService = async () => {
  try {
    const response = await axios.get(`${API_URL}`)
    return response.data
  } catch (error) {
    console.error('Error fetching notifications:', error)
    throw error
  }
}

// Mark notification as read
export const markAsReadService = async (notificationId) => {
  try {
    const response = await axios.put(`${API_URL}/${notificationId}/read`)
    return response.data
  } catch (error) {
    console.error('Error marking notification as read:', error)
    throw error
  }
}