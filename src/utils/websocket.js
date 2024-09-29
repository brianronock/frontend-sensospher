/***********************************************************
 * websocket.js
 * Utility to handle WebSocket connections for real-time updates.
 ***********************************************************/
let socket

export const connectWebSocket = (url) => {
  socket = new WebSocket(url)

  socket.onopen = () => {
    console.log('WebSocket connection established')
  }

  socket.onmessage = (event) => {
    console.log('Message from server:', event.data)
  }

  socket.onclose = () => {
    console.log('WebSocket connection closed')
  }

  socket.onerror = (error) => {
    console.error('WebSocket error:', error)
  }
}

export const sendMessage = (message) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(message)
  } else {
    console.error('WebSocket is not open')
  }
}

export const disconnectWebSocket = () => {
  if (socket) {
    socket.close()
  }
}