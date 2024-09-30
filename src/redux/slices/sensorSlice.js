/***********************************************************
    src/redux/slices/sensorSlice.js
/********************************************************************************************************
Purpose:
Manages the sensor data fetched from your backend (typically historical data). This slice handles asynchronous actions (using Redux Thunks) to fetch sensor data and update the state accordingly.

#Key Functions:
- `fetchSensors` (Thunk): 
  - Fetches sensor data from the backend service `fetchSensorsService`.
  - Handles three states: `pending`, `fulfilled`, and `rejected`, ensuring proper loading states and error handling.
  
#State:
- sensors: An array of sensor data fetched from the backend.
- loading: Boolean that tracks whether the data is currently being fetched.
- error: Stores any errors that occur during fetching.

#Recommendations:
- The implementation is solid. You could also include an error retry mechanism in your component that uses this slice, which can help improve the UX when fetching fails.
********************************************************************************************************/
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchSensorsService } from '../../services/sensorService'

// Thunk to fetch sensor data
export const fetchSensors = createAsyncThunk('sensors/fetchSensors', async (_, thunkAPI) => {
  try {
    const response = await fetchSensorsService()
    return response
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

const sensorSlice = createSlice({
  name: 'sensor',
  initialState: {
    sensors: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSensors.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchSensors.fulfilled, (state, action) => {
        state.loading = false
        state.sensors = action.payload
      })
      .addCase(fetchSensors.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default sensorSlice.reducer