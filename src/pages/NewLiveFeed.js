/***********************************************************
    src/components/newLiveFeed.js
/********************************************************************************************************
Purpose:
`newLiveFeed.js` manages the real-time post feed, handling operations such as creating, updating, deleting, and liking posts. It fetches posts from the backend via the Redux store and displays them in a feed format.

#Key Features:


#Function Flow:


********************************************************************************************************/
import React, { useContext, useState, useEffect, useCallback } from 'react'
import { PostContext } from '../hooks/context/PostContext'
import Post from '../components/NewPost'
import { createPostService } from '../services/feedService'

const NewLiveFeed = ({ socket, temperatureData, humidityData }) => {
  const { posts, loading, error, createPost, deletePost, updatePost, likePost } = useContext(PostContext)
  const [newPost, setNewPost] = useState('')
  const [chartType, setChartType] = useState(null) // State to store the chart type

  useEffect(() => {
    if (socket) {
      console.log('WebSocket connection established:', socket);  // Check socket instance


      socket.on('newPost', (post) => {
        createPost(post)       
        console.log('Received new post:', post)
      })
      socket.on('deletePost', ({ postId }) => {
        try {
          deletePost(postId);
          console.log('Post deleted:', postId);
        } catch (error) {
          console.error('Error deleting post:', error);
        }
      });
      socket.on('likePost', (updatedPost) => {
        updatePost(updatedPost._id, updatedPost)
        console.log('Post liked/unliked:', updatedPost)
      })

      return () => {
        socket.off('newPost')
        socket.off('deletePost')
        socket.off('likePost')
      }
    }
  }, [socket, createPost, deletePost, updatePost, updatePost._id])

  const handlePostSubmit = useCallback(async (e) => {
    e.preventDefault()
    if (newPost.trim() || chartType) {
        try {
            const postData = {
                content: newPost.trim() ? newPost : '',
                chartType // Send Chart type to backend (temp/hum) if available
            }
            await createPostService(postData) // send the post to the backend
            setNewPost('')
            setChartType(null) // Reset after submission                        
        } catch (error) {
            console.error('Error submitting post:', error) // Handle errors in post submission
        }
    }
  }, [newPost, chartType])

  const handleLike = useCallback((postId) => {
    if (postId) {
      likePost(postId)
    } else {
      console.error('Post ID is undefined')
    }
  }, [likePost])

  const handleDelete = useCallback((postId) => {
    deletePost(postId)
  }, [deletePost])

  const handleUpdatePost = useCallback((postId, content) => {
    updatePost(postId, content)
  }, [updatePost])

  if (loading) return <p>Loading feed...</p>
  if (error) return <p>Error loading feed: {error.message || 'Unknown error'}</p>

  return (
    <div>
      <h1>New Live Feed</h1>
      <form onSubmit={handlePostSubmit}>
        <textarea
          placeholder="Write a post..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)} // update the newPost state
        />
        <div>
          <button type="button" onClick={() => setChartType('temperature')}>Share Temperature Chart</button>
          <button type="button" onClick={() => setChartType('humidity')}>Share Humidity Chart</button>
        </div>
        <button type="submit">Post</button>
      </form>
      <div className='live-feed'>
        {posts.length > 0 ? (
          posts.map((post) => (
            <Post
              key={post._id}
              post={post}
              isLiked={Array.isArray(post.likes) && post.likes.includes(localStorage.getItem('userId'))}
              onLike={handleLike}
              onDelete={handleDelete}
              onEditSubmit={handleUpdatePost}
              temperatureData={temperatureData}
              humidityData={humidityData}
            />
          ))
        ) : (
          <p>No posts to display.</p>
        )}
      </div>
    </div>
  )
}

export default NewLiveFeed