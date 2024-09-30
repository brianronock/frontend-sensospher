/***********************************************************
    src/components/SideBar.js
/********************************************************************************************************
Purpose:
`Sidebar.js` renders a simple sidebar with navigation links for different parts of the app (e.g., `Dashboard`, `Sensors`, `Live Feed`, `Profile`).

#Key Features:


#Function Flow:


********************************************************************************************************/
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