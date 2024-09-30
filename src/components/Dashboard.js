/***********************************************************
    src/components/Dashboard.js
/********************************************************************************************************
Purpose:
The `Dashboard.js` component is the main container for displaying the live feed and sensor charts. It pulls in both the `LiveFeed` and `Sensors` components and arranges them side by side.

#Recommendations:
- The `Dashboard.js` is an appropriate component for the `components` folder. However, as it serves as a full page for authenticated users, it could also be moved to the `pages` folder since it's the main view for a logged-in user.

#Functionality:
- Contains the layout for the live feed on the left and sensor charts on the right.
- Receives the WebSocket instance via props (`socket`) and passes it down to the `Sensors` component.
********************************************************************************************************/
import React from 'react'
import LiveFeed from './LiveFeed'  // Import LiveFeed component
import Sensors from '../pages/Sensors'    // Import Sensors component

const Dashboard = ({ socket }) => {
  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <div className="dashboard-content">
        {/* Left: LiveFeed */}
        <div className="live-feed-section">
          <LiveFeed socket={socket} />
        </div>

        {/* Right: Sensors (Sensor Charts) */}
        <div className="sensor-section">
          <Sensors socket={socket} /> {/* Pass the socket as a prop to Sensors */}
        </div>
      </div>
    </div>
  )
}

export default Dashboard