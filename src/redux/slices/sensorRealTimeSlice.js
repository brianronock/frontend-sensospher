/***********************************************************
    src/redux/slices/sensorRealTimeSlice.js
/********************************************************************************************************
Purpose:
Handles real-time sensor data, typically received via WebSocket connections. This slice ensures that only the most recent data is kept in the state by limiting the stored data to 50 points.

#Key Functions:
- `updateTemperatureData` and `updateHumidityData`:
  - Append new temperature/humidity data to the state.
  - Limit the state to the most recent 50 points to prevent memory overload.
  
- `resetSensorData`: Optional function to reset the data, which can be used if you want to clear the real-time data.

#State:
- temperatureData: An array that holds real-time temperature data.
- humidityData: An array that holds real-time humidity data.
********************************************************************************************************/
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  temperatureData: [],
  humidityData: [],
}

const sensorRealTimeSlice = createSlice({
  name: 'sensor',
  initialState,
  reducers: {
    updateTemperatureData: (state, action) => {
      // Append the new temperature data while keeping only the last 50 points
      state.temperatureData = [...state.temperatureData, action.payload].slice(-50)
    },
    updateHumidityData: (state, action) => {
      // Append the new humidity data while keeping only the last 50 points
      state.humidityData = [...state.humidityData, action.payload].slice(-50)
    },
    resetSensorData: (state) => {
      // Reset sensor data when needed
      state.temperatureData = []
      state.humidityData = []
    },
  },
})

export const { updateTemperatureData, updateHumidityData, resetSensorData } = sensorRealTimeSlice.actions
export default sensorRealTimeSlice.reducer