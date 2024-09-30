/***********************************************************
    src/components/LiveFeed.js
/********************************************************************************************************
Purpose:
`LiveFeed.js` manages the real-time post feed, handling operations such as creating, updating, deleting, and liking posts. It fetches posts from the backend via the Redux store and displays them in a feed format.

#Key Features:


#Function Flow:


********************************************************************************************************/
import React, { useContext, useState, useEffect, useCallback } from 'react'
import { PostContext } from '../hooks/context/PostContext'
import Post from './Post'

const LiveFeed = ({ socket }) => {
  const { posts, loading, error, createPost, deletePost, updatePost, likePost } = useContext(PostContext)
  const [newPost, setNewPost] = useState('')

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

  const handlePostSubmit = useCallback((e) => {
    e.preventDefault()
    if (newPost.trim()) {
      createPost(newPost)
      setNewPost('')
    }
  }, [newPost, createPost])

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
      <h1>Live Feed</h1>
      <form onSubmit={handlePostSubmit}>
        <textarea
          placeholder="Write a post..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />
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
            />
          ))
        ) : (
          <p>No posts to display.</p>
        )}
      </div>
    </div>
  )
}

export default LiveFeed