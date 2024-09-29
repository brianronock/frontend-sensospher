/***********************************************************
 * NotFound.js
 * Displays a message when the user navigates to a non-existent route.
 ***********************************************************/
import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div>
      <h1>404 - Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/">Go back to Home</Link>
    </div>
  )
}

export default NotFound