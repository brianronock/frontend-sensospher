/***********************************************************
 * Sidebar.js
 * This component renders the sidebar navigation for the dashboard.
 ***********************************************************/
import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <aside>
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/sensors">Sensors</Link></li>
        <li><Link to="/feed">Live Feed</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
    </aside>
  )
}

export default Sidebar