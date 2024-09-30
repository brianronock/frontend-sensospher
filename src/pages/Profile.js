/***********************************************************
    src/pages/Profile.js
/********************************************************************************************************
Purpose:
`Profile.js` is responsible for displaying the user's profile information, including their name and email. It retrieves the profile data from Redux and handles any loading or error states.

#Key Features:
- Fetching Profile Data: On component mount, `fetchUserProfile` is dispatched to retrieve the user's profile data from the server.
- Loading and Error Handling: The component displays appropriate messages during the loading process or when errors occur.
- Displaying Data: Once the data is fetched, the user's name and email are displayed.

#Function Flow:
1. When the component mounts, it dispatches `fetchUserProfile`.
2. Displays a loading message until the user profile data is fetched.
3. Once data is available, it is displayed, or an error message is shown if something goes wrong.

********************************************************************************************************/
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