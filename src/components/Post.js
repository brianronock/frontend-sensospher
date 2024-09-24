import React from 'react';

const Post = React.memo(({ post, onLike, onEdit, onDelete, isLiked, editMode, editContent, setEditContent, onEditSubmit }) => {
  console.log('Rendering Post:', post._id);

  return (
    <div className='post'>
      {editMode === post._id ? (
        <>
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)} // Update editContent correctly
          />
          <button onClick={() => onEditSubmit(post._id)}>Save</button>
          <button onClick={() => setEditContent('')}>Cancel</button>
        </>
      ) : (
        <>
          <p>{post.content}</p>
          <div>
            <button onClick={() => onLike(post._id, isLiked)}>
              {isLiked ? 'Unlike' : 'Like'} ({post.likes.length})
            </button>
            <button onClick={() => onEdit(post._id)}>Edit</button>
            <button onClick={() => onDelete(post._id)}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
});

export default Post;