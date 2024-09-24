import React from 'react';
import LiveFeed from './LiveFeed';  // Import LiveFeed component
import Sensors from '../pages/Sensors';    // Import Sensors component

const Dashboard = ({ socket }) => {
  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <div className="dashboard-content">
        {/* Left: LiveFeed */}
        <div className="live-feed-section">
          <LiveFeed />
        </div>

        {/* Right: Sensors (Sensor Charts) */}
        <div className="sensor-section">
          <Sensors socket={socket} /> {/* Pass the socket as a prop to Sensors */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;