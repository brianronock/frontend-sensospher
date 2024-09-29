import React, { useState } from 'react'

// const Post = React.memo(({ post, onLike, onEdit, onDelete, isLiked, editMode, editContent, setEditContent, onEditSubmit }) => {
//   console.log('Rendering Post:', post._id)
// }
const Post = React.memo(({ post, isLiked, onLike, onDelete, onEditSubmit }) => {
  const [editMode, setEditMode] = useState(false)
  const [editContent, setEditContent] = useState(post.content)

  const handleEditSubmit = () => {
    onEditSubmit(post._id, editContent)
    setEditMode(false)
  }

  return (
    <div className='post'>
      <h3>{post.content}</h3>
      {editMode ? (
        <div>
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
          <button onClick={handleEditSubmit}>Save</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </div>
      ) : (
        <>
          <button onClick={() => setEditMode(true)}>Edit</button>
          <button onClick={() => onDelete(post._id)}>Delete</button>
          <button onClick={() => onLike(post._id)}> {isLiked ? 'Unlike' : 'Like'} ({Array.isArray(post.likes) ? post.likes.length : 0})</button>
        </>
      )}
    </div>
  )
})

export default Post