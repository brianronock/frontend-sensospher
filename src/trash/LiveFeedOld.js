import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts, createPost, deletePost, updatePost, likePost } from '../redux/slices/feedSlice'
import Post from './Post'

const LiveFeed = ({ socket }) => {
  const dispatch = useDispatch()
  const { posts, loading, error } = useSelector((state) => state.feed)
  const [newPost, setNewPost] = useState('')
  const [editMode, setEditMode] = useState(null)
  const [editContent, setEditContent] = useState('')

  useEffect(() => {
    dispatch(fetchPosts()) // Fetch initial postst on mount
    if(socket){
      // Listen for new posts
      socket.on('newPost', (post) => {
        dispatch({ type: 'feed/addPost', payload: post })  // Dispatch action to add the new post
      })

      // Listen for post deletions
      socket.on('deletePost', ({ postId }) => {
        dispatch({ type: 'feed/removePost', payload: postId })  // Dispatch action to remove the post
      })

      // Listen for likes
      socket.on('likePost', (updatedPost) => {
        dispatch({ type: 'feed/updatePost', payload: updatedPost })  // Update the post with new likes
      })
    }

    // Clean up WebSocket listeners on unmount
    return () => {
      if(socket){
        socket.off('newPost')
        socket.off('deletePost')
        socket.off('likePost')        
      }
    }
  }, [socket, dispatch])

 

  const handlePostSubmit = useCallback((e) => {
    e.preventDefault()
    if (newPost.trim() !== '') {
      dispatch(createPost({ content: newPost }))
      setNewPost('')
    }
  }, [dispatch, newPost])

  const handleEdit = useCallback((postId) => {
    const postToEdit = posts.find((post) => post._id === postId)
    setEditContent(postToEdit.content)
    setEditMode(postId)
  }, [posts])

  const handleEditSubmit = useCallback((postId) => {
    dispatch(updatePost({ id: postId, content: editContent }))
    setEditMode(null)
  }, [dispatch, editContent])

  const handleDelete = useCallback((postId) => {
    dispatch(deletePost(postId))
  }, [dispatch])

  const handleLike = useCallback((postId, isLiked) => {
    if (!isLiked) {
      dispatch(likePost(postId))
        .unwrap()
        .catch((error) => console.error('Error liking post:', error))
    }
  }, [dispatch])

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
              isLiked={post.likes.includes(localStorage.getItem('userId'))}
              onLike={handleLike}
              onEdit={handleEdit}
              onDelete={handleDelete}
              editMode={editMode}
              editContent={editContent}
              setEditContent={setEditContent}
              onEditSubmit={handleEditSubmit}
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