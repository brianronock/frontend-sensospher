/***********************************************************
    src/pages/Register.js
/********************************************************************************************************
Purpose:
The `Register.js` component allows users to sign up for a new account by submitting their name, email, and password. The form dispatches the `registerUser` action from the `authSlice`.

#Key Features:
- Form Handling: The form collects the user's name, email, and password, and upon submission, triggers the `registerUser` action in Redux.
- Local State: Uses `useState` to manage the input values for name, email, and password.
- Dispatching Actions: The `handleSubmit` function dispatches the user registration data to the Redux store.

#Function Flow:
1. User inputs name, email, and password.
2. On form submission, `handleSubmit` dispatches the `registerUser` action.
3. The user is successfully registered and logged in after registration.

********************************************************************************************************/
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { registerUser } from '../redux/slices/authSlice'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(registerUser({ name, email, password }))
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register