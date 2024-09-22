import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadUserFromLocalStorage } from './redux/slices/authSlice';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './components/Dashboard';
import Profile from './pages/Profile';
import LiveFeed from './components/LiveFeed';
import ProtectedRoute from './routes/ProtectedRoute';
import PublicRoute from './routes/PublicRoute';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar'; 
import Sensors from './pages/Sensors'; 
import Footer from './components/Footer'
import './App.css'
import io from 'socket.io-client'; // Assuming you're using socket.io



const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserFromLocalStorage());  // Dispatch the action to check for user token and rehydrate
  }, [dispatch]);

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Initialize WebSocket connection
    const newSocket = io('http://localhost:3000');
    setSocket(newSocket); // Store socket in state

    return () => {
      // Clean up WebSocket connection when the component unmounts
      newSocket.disconnect();
    };
  }, []);

  return (
    <>
      <div className='mainContainer'>
        <Navbar />
        <div className='container'>
          <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="/login" element={ <PublicRoute><Login /></PublicRoute> }/>
            <Route path="/register" element={ <PublicRoute><Register /></PublicRoute> }/>
            <Route path="/dashboard" element={ <ProtectedRoute><Dashboard socket={socket} /></ProtectedRoute> }/>
            <Route path="/profile" element={ <ProtectedRoute><Profile /></ProtectedRoute> }/>
            <Route path="/feed" element={ <ProtectedRoute><LiveFeed /> </ProtectedRoute> }/>
            <Route path="/sensors" element={ <ProtectedRoute><Sensors socket={socket} /></ProtectedRoute> }/> 
            <Route path="*" element={<NotFound />} />
          </Routes>        
        </div>
        <Footer />      
      </div>
    </>
  );
};

export default App;