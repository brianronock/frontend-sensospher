/***********************************************************
    src/components/Footer.js
/********************************************************************************************************
Purpose:
`Footer.js` is a simple functional component that renders a footer at the bottom of the application with the current year.

#Key Features:


#Function Flow:


********************************************************************************************************/
import React from 'react'

const Footer = () => {
  return (
    <footer>
      <p>&copy; {new Date().getFullYear()} SensoSphere</p>
    </footer>
  )
}

export default Footer