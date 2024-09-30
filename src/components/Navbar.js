/***********************************************************
 * Navbar.js
 * This component renders the navigation bar with links.
 ***********************************************************/
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/slices/authSlice'

const Navbar = () => {
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector((state) => state.auth)  // Access auth state
  const [isActive, setIsActive] = useState(false)

  const handleToggle = () => {
    setIsActive(!isActive)
  }

  const handleLogout = () => {
    dispatch(logout())  // Dispatch the logout action
    setIsActive(false)  // Close navbar after logout
  }

  // Close navbar when a link is clicked
  const handleLinkClick = () => {
    setIsActive(false)
  }

  const handleClick = () =>{
    setIsActive(true)
    setTimeout(() => {
      setIsActive(false)
    }, 100)
  }

  return (
    <nav>
      <div className={`navbar ${isActive ? 'active' : ''}`}>
        <div className="navbar-icon" onClick={handleToggle}>
          &#9776; {/* Hamburger icon */}
        </div>
        <div className="nav-links">
          <ul>
            <li className={`nav-link ${isActive ? 'active' : ''}`} onClick={handleClick}><Link to="/" onClick={handleLinkClick}>Home</Link></li>
            <li ><Link to="/dashboard" onClick={handleLinkClick}>Dashboard</Link></li>
            <li><Link to="/profile" onClick={handleLinkClick}>Profile</Link></li>
            <li><Link to="/sensors" onClick={handleLinkClick}>Sensors</Link></li>
            <li><Link to="/feed" onClick={handleLinkClick}>Live Feed</Link></li>
            {!isAuthenticated ? (
              <li><Link to="/login" style={{color: "lime"}} onClick={handleLinkClick}>Login</Link></li>
            ) : (
              <li><Link to="/" style={{color: "orange"}} onClick={handleLogout}>Logout</Link></li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar