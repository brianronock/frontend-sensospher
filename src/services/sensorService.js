/***********************************************************
    src/services/sensorService.js
/********************************************************************************************************
Purpose:
The `sensorService.js` handles API requests related to sensors, fetching and updating sensor data.

#Key Functions:
- `fetchSensorsService()`: Sends a GET request to fetch all sensor data from the backend.
- `updateSensorService(sensorId, sensorData)`: Sends a PUT request to update a specific sensor’s data.

How it integrates:
- The `sensorSlice.js` and `sensorRealTimeSlice.js` leverage this service to update the sensor data in the frontend.
********************************************************************************************************/
import axios from 'axios'

// const API_URL = 'http://192.168.0.16:3000/api/sensors' // Home Local network Devices
// const API_URL = 'http://172.16.97.127:3000/api/sensors'; // HTL Wien West Network
const API_URL = 'http://localhost:3000/api/addSensors' // Beta version
//const API_URL = 'http://localhost:3000/api/sensors' // Default Backend API URL

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