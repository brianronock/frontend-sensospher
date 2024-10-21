import React, { useState, useEffect } from 'react'
import axios from 'axios'

const NewProfile = () => {
  const [sensors, setSensors] = useState([])
  const [newSensor, setNewSensor] = useState({ name: '', type: 'temperature' }) // Default sensor type

  // Fetch user sensors on mount
  useEffect(() => {
    const fetchSensors = async () => {
      const token = localStorage.getItem('token')  // Retrieve token from local storage
      const response = await axios.get('http://localhost:3000/api/addSensors/user', {
        headers: {
          Authorization: `Bearer ${token}`,  // Add Authorization header with Bearer token
        },
      })
      setSensors(response.data)
    }
    fetchSensors()
  }, [])

  // Add a new sensor
  const handleAddSensor = async () => {
    try {
      const token = localStorage.getItem('token')  // Retrieve token from local storage
      const response = await axios.post('http://localhost:3000/api/addSensors/create', {
        name: newSensor.name, // Ensure name is provided
        type: newSensor.type // Ensure type is provided 
      }, {
        headers: {
          Authorization: `Bearer ${token}`,  // Add Authorization header with Bearer token
        },
      })
      setSensors([...sensors, response.data]) // Update state with the new sensor
      setNewSensor({ name: '', type: 'temperature' }) // Reset form
    } catch (error) {
      console.error('Error adding sensor:', error)
    }
  }

  return (
    <div>
      <h2>Your Sensors</h2>
      <ul>
        {sensors.map(sensor => (
          <li key={sensor._id}>{sensor.name} - {sensor.type}</li>
        ))}
      </ul>

      <h3>Add a new sensor</h3>
      <input
        type="text"
        placeholder="Sensor Name"
        value={newSensor.name}
        onChange={(e) => setNewSensor({ ...newSensor, name: e.target.value })}
      />
      <select
        value={newSensor.type}
        onChange={(e) => setNewSensor({ ...newSensor, type: e.target.value })}
      >
        <option value="temperature">Temperature</option>
        <option value="humidity">Humidity</option>
      </select>
      <button onClick={handleAddSensor}>Add Sensor</button>
    </div>
  )
}

export default NewProfile