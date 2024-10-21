/***********************************************************
    src/components/Post.js
/********************************************************************************************************
Purpose:
`Post.js` is used to render each individual post in the live feed. It includes options for editing, liking, and deleting posts.

#Key Features:


#Function Flow:


********************************************************************************************************/
import React, { useState } from 'react'
import SensorChartSingle from './SensorChart'


// const Post = React.memo(({ post, onLike, onEdit, onDelete, isLiked, editMode, editContent, setEditContent, onEditSubmit }) => {
//   console.log('Rendering Post:', post._id)
// }
const NewPost = React.memo(({ post, isLiked, onLike, onDelete, onEditSubmit, temperatureData, humidityData }) => {
  const [editMode, setEditMode] = useState(false)
  const [editContent, setEditContent] = useState(post.content)

  const handleEditSubmit = () => {
    onEditSubmit(post._id, editContent)
    setEditMode(false)
  }

  return (
    <div className='post'>
        <div>
            {post.chartType && (
                <div>
                {post.chartType === 'temperature' && (
                    <SensorChartSingle
                    sensorData={temperatureData} // Pass temperature data for real-time chart
                    label="Temperature (°C)"
                    borderColor="rgba(75,192,192,1)"
                    backgroundColor="rgba(75,192,192,0.2)"
                    />
                )}
                {post.chartType === 'humidity' && (
                    <SensorChartSingle
                    sensorData={humidityData} // Pass humidity data for real-time chart
                    label="Humidity (%)"
                    borderColor="rgba(153,102,255,1)"
                    backgroundColor="rgba(153,102,255,0.2)"
                    />
                )}
                </div>
            )}
        </div>
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

export default NewPost