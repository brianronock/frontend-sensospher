/***********************************************************
    src/utils/websocket.js
/********************************************************************************************************
Purpose:
This file provides a basic implementation for WebSocket connections to handle real-time data flow (similar to `webSocketService.js`, but more generic).

#Key Functions:
- `connectWebSocket(url)`: Establishes a WebSocket connection to a given URL.
- `sendMessage(message)`: Sends a message to the server via WebSocket.
- `disconnectWebSocket()`: Closes the WebSocket connection.

How it integrates:
- It can be used in the same way as `webSocketService.js` to manage real-time data flow in the frontend.
********************************************************************************************************/
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