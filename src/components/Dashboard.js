/***********************************************************
 * Dashboard.js
 * Component to display the live feed using Redux state and 
 * dispatching async thunks.
 ***********************************************************/
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../redux/slices/feedSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.feed);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) {
    return <p>Loading posts...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Live Feed</h1>
      {posts.map((post) => (
        <div key={post._id}>
          <h2>{post.content}</h2>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;