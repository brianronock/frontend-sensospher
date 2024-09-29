/***********************************************************
 * authSlice.js
 * Redux slice for managing authentication state and actions.
 ***********************************************************/
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { loginService, registerService, getProfile } from '../../services/authService'
import { saveToken, clearToken } from '../../utils/authHelper'

// Async action for user login
export const loginUser = createAsyncThunk('auth/loginUser', async (userData, thunkAPI) => {
  try {
    const response = await loginService(userData)  // Ensure loginService is called correctly
    saveToken(response.token)  // Save token to localStorage
    return response  // Return the response which includes user data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

// Async action for user registration
export const registerUser = createAsyncThunk('auth/registerUser', async (userData, thunkAPI) => {
  try {
    const response = await registerService(userData)
    saveToken(response.token)
    return response
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

// Fetch user profile based on token stored in localStorage
export const loadUserFromLocalStorage = createAsyncThunk('auth/loadUserFromLocalStorage', async (_, thunkAPI) => {
  const token = localStorage.getItem('token')  // Retrieve token from localStorage
  if (token) {
    try {
      const response = await getProfile()  // Assuming getProfile uses the token automatically
      return response  // Return the user data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)  // Handle any errors
    }
  } else {
    return thunkAPI.rejectWithValue('No token found')  // If no token, reject
  }
})

// Async action for fetching user profile
export const fetchUserProfile = createAsyncThunk('auth/fetchUserProfile', async (_, thunkAPI) => {
  try {
    const response = await getProfile()
    return response
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      clearToken()
      state.user = null
      state.isAuthenticated = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.isAuthenticated = true
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(loadUserFromLocalStorage.pending, (state) => {
        state.loading = true
      })
      .addCase(loadUserFromLocalStorage.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.isAuthenticated = true
      })
      .addCase(loadUserFromLocalStorage.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.isAuthenticated = false
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer