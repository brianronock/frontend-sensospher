/***********************************************************
    src/store.js
/********************************************************************************************************
The `store.js` file configures your Redux store. It combines different reducers (slices) into one store, which is the central location where your application's state is managed.

#Key Features:
- Reducers: It combines the `feed`, `auth`, `sensor`, and `sensorRealTime` reducers.
- Middleware: Custom middleware is added to disable the `serializableCheck` and `immutableCheck`. This is particularly useful if you're handling non-serializable data (like WebSocket connections).

#Flow:
- When you dispatch an action (such as `loginUser` or `fetchPosts`), Redux will check which slice the action belongs to, and the corresponding reducer will handle the state update.
********************************************************************************************************/
import React from 'react'
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