/***********************************************************
 * Home.js
 * Component for the landing page or homepage of the app.
 ***********************************************************/
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='home'>
      <div className='leftCont'>
      <h1>Welcome to SensoSphere</h1>
      <p>Real-time sensor data and live updates.</p>
      {/* <p>&copy; 2024 SensoSphere</p> // Replaced with footer component in main App*/}
      {/* Links to other pages */}
      </div>

      <div className='rightCont'>
        <nav className='rightCont'>
          <ul>
            <li><Link to="/dashboard">Go to Dashboard</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </ul>
        </nav> 
        <p>API documentation is available for download.</p>
        {/* Download button */}
        <a href="http://localhost:3000/api-docs" download>
          <button>Download API Documentation</button>
        </a>       

      </div>


    </div>
  );
};

export default Home;