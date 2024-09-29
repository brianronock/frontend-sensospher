/***********************************************************
 * Profile.js
 * Component to display user profile information
 ***********************************************************/
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserProfile } from '../redux/slices/authSlice'

const Profile = () => {
  const dispatch = useDispatch()
  const { user, loading, error } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(fetchUserProfile())
  }, [dispatch])

  if (loading) {
    return <p>Loading profile...</p>
  }

  if (error) {
    return <p>Error: {error}</p>
  }

  return (
    <div>
    <h1>User Profile</h1>
    <div className='profile'>
      {user ? (
        <div>
          <h1>Profile page of {user.name}</h1>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>No user information available</p>
      )}
    </div>      
    </div>

  )
}

export default Profile