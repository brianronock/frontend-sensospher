import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from '../redux/slices/feedSlice';

const AddPostForm = () => {
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost({ content }));
    setContent('');  // Clear the input field after submitting
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write something..."
      />
      <button type="submit">Add Post</button>
    </form>
  );
};

export default AddPostForm;