/***********************************************************
 * Profile.js
 * Component to display user profile information
 ***********************************************************/
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserProfile } from '../redux/slices/authSlice'
import Sidebar from '../components/Sidebar'

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
    <div className='mainContainer'>
      <h1>User Profile</h1>
      <div className='profile leftCont'>
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
      <div className='rightCont'>
        <Sidebar />      
      </div>


    </div>

  )
}

export default Profile