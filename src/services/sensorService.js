/***********************************************************
 * sensorService.js
 * Handles API requests for fetching and managing sensor data.
 ***********************************************************/
import axios from 'axios'

const API_URL = 'http://localhost:3000/api/sensors'

// Fetch all sensor data with Authorization header
export const fetchSensorsService = async () => {
  try {
    const token = localStorage.getItem('token')  // Retrieve token from local storage
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,  // Add Authorization header with Bearer token
      },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching sensors:', error)
    throw error
  }
}

// Update a specific sensor
export const updateSensorService = async (sensorId, sensorData) => {
  try {
    const token = localStorage.getItem('token')  // Retrieve token from local storage
    const response = await axios.put(`${API_URL}/${sensorId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,  // Add Authorization header with Bearer token
        },
      }, sensorData)
    return response.data
  } catch (error) {
    console.error('Error updating sensor:', error)
    throw error
  }
}