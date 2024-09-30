/***********************************************************
    src/pages/NotFound.js
/********************************************************************************************************
Purpose:
The `NotFound.js` component handles any undefined routes and displays a 404 message to the user. It provides a link back to the homepage.

#Key Features:
- 404 Message: Displays a message indicating that the page doesn't exist.
- Home Link: Provides a link to return to the homepage for easy navigation.

#Function Flow:
1. If a user navigates to a non-existent route, the component is displayed.
2. A 404 message is shown along with a link to the homepage.

********************************************************************************************************/
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