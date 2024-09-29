/***********************************************************
 * store.js
 * Redux store configuration, combining all the slices.
 ***********************************************************/
import { configureStore } from '@reduxjs/toolkit'
// import feedReducer from './slices/feedSlice'
import authReducer from './slices/authSlice'
import sensorReducer from './slices/sensorSlice'
import sensorRealTimeReducer from './slices/sensorRealTimeSlice'

const store = configureStore({
  reducer: {
    // feed: feedReducer,
    auth: authReducer,
    sensor: sensorReducer,
    sensorRealTime: sensorRealTimeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable it here
      immutableCheck: false,    // Disable it here
    }),
})

export default store