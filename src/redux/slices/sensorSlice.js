/***********************************************************
 * sensorSlice.js
 * Redux slice for managing sensor data state and actions.
 ***********************************************************/
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