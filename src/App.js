/***********************************************************
    src/app.js
/********************************************************************************************************
- Purpose: The `App.js` file is the core of your React frontend application. It defines the main structure of the app, setting up routes and global state management, and initializing WebSocket connections.

#Key Features:
- Routing: The app uses `react-router-dom` for handling client-side routing. It sets up routes for various pages such as `Home`, `Login`, `Register`, `Dashboard`, `Profile`, `LiveFeed`, `Sensors`, and a fallback `NotFound` page for undefined routes.  
  Each route is either public (e.g., `Login`, `Register`) or protected (e.g., `Dashboard`, `Profile`), which are handled by `ProtectedRoute` and `PublicRoute` components. This structure ensures that certain pages are only accessible when a user is authenticated.
- WebSocket: A WebSocket connection is initialized using the `socket.io-client` library to communicate with the backend for real-time updates. The WebSocket is passed down as a prop to components like `Dashboard` and `Sensors`.
- Redux: On mount (`useEffect`), the `loadUserFromLocalStorage` action from the `authSlice` is dispatched to retrieve the user's authentication status from local storage. Redux is used for managing global state across components.

#Dependencies:
- Redux: Used for state management, specifically user authentication.
- WebSocket: Provides real-time communication for features like the sensor dashboard.
- Routes: Manages client-side navigation.

#Function Flow:
1. useEffect: On component mount, it checks for existing user tokens in local storage to authenticate the user.
2. WebSocket Setup: Initializes a WebSocket connection and passes the socket to components that need real-time communication.
3. Routes: Depending on the route, it renders different components.
********************************************************************************************************/

import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loadUserFromLocalStorage } from './redux/slices/authSlice'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './components/Dashboard'
import Profile from './pages/Profile'
import LiveFeed from './components/LiveFeed'
import ProtectedRoute from './routes/ProtectedRoute'
import PublicRoute from './routes/PublicRoute'
import NotFound from './pages/NotFound'
// import Navbar from './components/Navbar' 
import Sensors from './pages/Sensors' 
import Footer from './components/Footer'
import './App.css'
import io from 'socket.io-client'
import PostProvider from './hooks/context/PostContext'
import { Header } from './components/Header'
import NewLiveFeed from './pages/NewLiveFeed'
import NewProfile from './pages/NewProfile'



const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadUserFromLocalStorage())  // Dispatch the action to check for user token and rehydrate
  }, [dispatch])

  const [socket, setSocket] = useState(null)

  useEffect(() => {
    // Initialize WebSocket connection
    const newSocket = io('http://localhost:3000')
    setSocket(newSocket) // Store socket in state
    console.log('WebSocket connected:', newSocket) // Log to ensure connection
    return () => {
      // Clean up WebSocket connection when the component unmounts
      newSocket.disconnect()
    }
  }, [])

  return (
    <>
      <PostProvider>
        <div className='mainContainer'>
          <Header />
          <div className='container'>
            <Routes>
              <Route path="/" element={ <Home /> } />
              <Route path="/login" element={ <PublicRoute><Login /></PublicRoute> }/>
              <Route path="/register" element={ <PublicRoute><Register /></PublicRoute> }/>
              <Route path="/dashboard" element={ <ProtectedRoute><Dashboard socket={socket} /></ProtectedRoute> }/>
              <Route path="/profile" element={ <ProtectedRoute><Profile /></ProtectedRoute> }/>
              <Route path="/newProfile" element={ <ProtectedRoute><NewProfile /></ProtectedRoute> }/>
              <Route path="/feed" element={ <ProtectedRoute><LiveFeed socket={socket} /> </ProtectedRoute> }/>
              <Route path="/addFeed" element={ <ProtectedRoute><NewLiveFeed socket={socket} /> </ProtectedRoute> }/>
              <Route path="/sensors" element={ <ProtectedRoute><Sensors socket={socket} /></ProtectedRoute> }/> 
              <Route path="*" element={<NotFound />} />
            </Routes>        
          </div>
          <Footer />      
        </div>      
      </PostProvider>
    </>
  )
}

export default App