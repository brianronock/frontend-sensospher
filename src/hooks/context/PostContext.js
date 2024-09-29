// src/context/PostContext.js
import React, { createContext, useState, useEffect, useCallback } from 'react'
import { fetchPostsService, createPostService, deletePostService, updatePostService, likePostService } from '../../services/feedService'

export const PostContext = createContext()

const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await fetchPostsService()
        setPosts(data)
        setLoading(false)
      } catch (error) {
        setError(error)
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const createPost = useCallback(async (content) => {
    try {
      const newPost = await createPostService({ content })
      setPosts((prevPosts) => [...prevPosts, newPost])
    } catch (error) {
      setError(error)
    }
  }, [])

  const deletePost = useCallback(async (postId) => {
    try {
      await deletePostService(postId)
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId))
    } catch (error) {
      setError(error)
    }
  }, [])

  const updatePost = useCallback(async (id, content) => {
    try {
      const updatedPost = await updatePostService(id, content)
      setPosts((prevPosts) => prevPosts.map((post) => (post._id === id ? updatedPost : post)))
    } catch (error) {
      setError(error)
    }
  }, [])

  const likePost = useCallback(async (postId) => {
    try {
      const likedPost = await likePostService(postId)
      setPosts((prevPosts) => prevPosts.map((post) => (post._id === postId ? likedPost : post)))
    } catch (error) {
      setError(error)
    }
  }, [])

  return (
    <PostContext.Provider value={{ posts, loading, error, createPost, deletePost, updatePost, likePost }}>
      {children}
    </PostContext.Provider>
  )
}

export default PostProvider