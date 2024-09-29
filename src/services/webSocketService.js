// src/services/websocketService.js
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