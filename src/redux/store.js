/***********************************************************
 * store.js
 * Redux store configuration, combining all the slices.
 ***********************************************************/
import { configureStore } from '@reduxjs/toolkit';
import feedReducer from './slices/feedSlice';
import authReducer from './slices/authSlice';
import sensorReducer from './slices/sensorSlice';

const store = configureStore({
  reducer: {
    feed: feedReducer,
    auth: authReducer,
    sensor: sensorReducer,
  },
});

export default store;