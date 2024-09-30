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

let socket

export const connectWebSocket = () => {
  if (!socket) {
    socket = io('http://localhost:3000') // Backend WebSocket URL
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