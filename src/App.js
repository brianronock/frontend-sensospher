import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { useDispatch } from 'react-redux';
import { loadUserFromLocalStorage } from './redux/slices/authSlice';
import store from './redux/store';
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

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserFromLocalStorage());  // Dispatch the action to check for user token and rehydrate
  }, [dispatch]);

  return (
    <Provider store={store}>
      <Navbar />
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/login" element={ <PublicRoute><Login /></PublicRoute> }/>
        <Route path="/register" element={ <PublicRoute><Register /></PublicRoute> }/>
        <Route path="/dashboard" element={ <ProtectedRoute><Dashboard /></ProtectedRoute> }/>
        <Route path="/profile" element={ <ProtectedRoute><Profile /></ProtectedRoute> }/>
        <Route path="/feed" element={ <ProtectedRoute><LiveFeed /> </ProtectedRoute> }/>
        <Route path="/sensors" element={ <ProtectedRoute><Sensors /></ProtectedRoute> }/> 
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Provider>
  );
};

export default App;