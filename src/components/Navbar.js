/***********************************************************
 * Navbar.js
 * This component renders the navigation bar with links.
 ***********************************************************/
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);  // Access auth state

  const handleLogout = () => {
    dispatch(logout());  // Dispatch the logout action
  };

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/sensors">Sensors</Link></li>
        <li><Link to="/feed">Live Feed</Link></li>
        {!isAuthenticated ? (
          <li>
            <Link to="/login">Login</Link>
          </li>
        ) : (
          <li>
            <Link onClick={handleLogout}>Logout</Link>
          </li>
        )}        </ul>
    </nav>
  );
};

export default Navbar;