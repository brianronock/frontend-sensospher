/***********************************************************
 * LiveFeed.js
 * Component for displaying live feed and adding new posts.
 ***********************************************************/
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, createPost } from '../redux/slices/feedSlice';  // Adjust this if needed

const LiveFeed = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.feed);
  const [newPost, setNewPost] = useState('');  // State for new post content

  // Fetch posts when the component mounts
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (newPost.trim() !== '') {
      dispatch(createPost({ content: newPost }));  // Dispatch the create post action
      setNewPost('');  // Clear the input field after submission
    }
  };

  if (loading) {
    return <p>Loading feed...</p>;
  }

  if (error) {
    return <p>Error loading feed: {error}</p>;
  }

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
          <div key={post._id} className='post'>
            <p>{post.content}</p>
          </div>
        ))
      ) : (
        <p>No posts to display.</p>
      )}
    </div>
    </div>

  );
};

export default LiveFeed;