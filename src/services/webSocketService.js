/***********************************************************
    src/services/webSocketService.js
/********************************************************************************************************
Purpose:
This file manages WebSocket connections, which are used for real-time communication between the frontend and backend (e.g., live sensor updates, live feed).

#Key Functions:
- `connectWebSocket()`: Establishes a WebSocket connection with the backend server.
- `disconnectWebSocket()`: Disconnects the WebSocket connection.
- `getSocket()`: Provides access to the existing WebSocket connection.

How it integrates:
- The WebSocket service is passed into components like the dashboard and sensors to allow real-time communication.
********************************************************************************************************/
import { io } from 'socket.io-client'

// const API_URL = 'http://192.168.0.16:3000' // Home Local network Devices
// const API_URL = 'http://172.16.97.127:3000'; // HTL Wien West Network
const API_URL = 'http://localhost:3000' // Default Backend Websocket URL

let socket

export const connectWebSocket = () => {
  if (!socket) {
    socket = io(API_URL)
    console.log('WebSocket connected:', socket.id)
  }
  return socket
}

export const disconnectWebSocket = () => {
  if (socket) {
    socket.disconnect()
    console.log('WebSocket disconnected')
  }
}

export const getSocket = () => {
  if (!socket) {
    console.error("Socket has not been initialized. Call connectWebSocket first.")
  }
  return socket
}