// src/redux/slices/sensorRealTimeSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  temperatureData: [],
  humidityData: [],
};

const sensorRealTimeSlice = createSlice({
  name: 'sensor',
  initialState,
  reducers: {
    updateTemperatureData: (state, action) => {
      // Append the new temperature data while keeping only the last 50 points
      state.temperatureData = [...state.temperatureData, action.payload].slice(-50);
    },
    updateHumidityData: (state, action) => {
      // Append the new humidity data while keeping only the last 50 points
      state.humidityData = [...state.humidityData, action.payload].slice(-50);
    },
    resetSensorData: (state) => {
      // Optional: Reset sensor data when needed
      state.temperatureData = [];
      state.humidityData = [];
    },
  },
});

export const { updateTemperatureData, updateHumidityData, resetSensorData } = sensorRealTimeSlice.actions;
export default sensorRealTimeSlice.reducer;