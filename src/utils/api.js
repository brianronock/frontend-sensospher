/***********************************************************
    src/utils/api.js
/********************************************************************************************************
Purpose:
This file configures a central Axios instance for making HTTP requests. It is used to make API calls with a consistent base URL and automatically adds authentication tokens to each request.

#Key Features:
- Axios Interceptors: The interceptor adds the JWT token from localStorage to every outgoing request’s header. This ensures that authenticated requests to protected routes are handled easily.

How it integrates:
- This central Axios instance can be used in services like `authService.js`, `feedService.js`, and `sensorService.js`, ensuring all requests are standardized.
********************************************************************************************************/
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosInstance