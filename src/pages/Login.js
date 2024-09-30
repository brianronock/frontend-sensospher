/***********************************************************
    src/pages/Login.js
/********************************************************************************************************
Purpose:
The `Login.js` file provides the user interface and logic for user login. It allows users to input their email and password, displays error messages on failed login attempts, and dispatches the login action to Redux.

#Key Features:
- State Management: Manages email, password, and error message state locally using `useState`.
- Form Submission: The form uses `handleSubmit` to dispatch the `loginUser` action from the `authSlice` Redux slice. On successful login, the user is redirected to the `/feed` page.
- Error Handling: Displays error messages if login fails (e.g., incorrect credentials).
- Password Visibility Toggle: A button is provided to toggle the visibility of the password input field, improving UX.

#Function Flow:
1. User enters email and password.
2. On form submission, `handleSubmit` is triggered, dispatching the `loginUser` action.
3. If login is successful, the user is redirected; otherwise, an error message is displayed.

********************************************************************************************************/

import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../redux/slices/authSlice'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)  // State to toggle password visibility
  const [errorMessage, setErrorMessage] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await dispatch(loginUser({ email, password })).unwrap()
      setErrorMessage('')
      navigate('/feed')
    } catch (error) {
      setErrorMessage('Login failed. Please check your credentials.')
    }
  }

  return (
    <div>
      <h1>Login</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <div>
          <input 
            type={showPassword ? 'text' : 'password'}  // Toggle between text and password input type
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? 'Hide' : 'Show'}  {/* Toggle button text */}
          </button>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login