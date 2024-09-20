/***********************************************************
 * Navbar.js
 * This component renders the navigation bar with links.
 ***********************************************************/
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/sensors">Sensors</Link></li>
        <li><Link to="/feed">Live Feed</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;