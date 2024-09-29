/***********************************************************
 * notificationService.js
 * Handles API requests for fetching and managing notifications.
 ***********************************************************/
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