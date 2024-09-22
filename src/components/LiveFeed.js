/***********************************************************
 * LiveFeed.js
 * Component for displaying live feed, adding, editing,
 * deleting, and liking posts.
 ***********************************************************/
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, createPost, deletePost, updatePost, likePost } from '../redux/slices/feedSlice';

const LiveFeed = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.feed);
  const [newPost, setNewPost] = useState('');  // State for new post content
  const [editMode, setEditMode] = useState(null); // State to track the post being edited
  const [editContent, setEditContent] = useState(''); // State to track edited content

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

  const handleEdit = (postId) => {
    const postToEdit = posts.find((post) => post._id === postId);
    setEditContent(postToEdit.content);
    setEditMode(postId); // Set the post in edit mode
  };

  const handleEditSubmit = (postId) => {
    dispatch(updatePost({ id: postId, content: editContent }));
    setEditMode(null); // Exit edit mode after submitting
  };

  const handleDelete = (postId) => {
    dispatch(deletePost(postId));  // Dispatch delete action
  };

  const handleLike = (postId) => {
    dispatch(likePost(postId)).unwrap()
      .catch((error) => {
        if (error.message === 'You already liked this post') {
          console.log('User already liked this post.');
          // Optionally show a small notification or toast
        } else {
          console.error('Error liking the post:', error);
        }
      });
  };

  if (loading) {
    return <p>Loading feed...</p>;
  }

  if (error) {
    return <p>Error loading feed: {error.message || 'Unknown error'}</p>;
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
              {editMode === post._id ? (
                <>
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                  />
                  <button onClick={() => handleEditSubmit(post._id)}>Save</button>
                  <button onClick={() => setEditMode(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <p>{post.content}</p>
                  <div>
                    <button onClick={() => handleLike(post._id)}>
                      Like ({post.likes?.length || 0})
                    </button>
                    <button onClick={() => handleEdit(post._id)}>Edit</button>
                    <button onClick={() => handleDelete(post._id)}>Delete</button>
                  </div>
                </>
              )}
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