/***********************************************************
 * Sensors.js
 * Page component to display and manage sensor data.
 ***********************************************************/
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSensors } from '../redux/slices/sensorSlice';

const Sensors = () => {
  const dispatch = useDispatch();
  const { sensors, loading, error } = useSelector((state) => state.sensor);

  useEffect(() => {
    dispatch(fetchSensors());  // Fetch sensor data when component mounts
  }, [dispatch]);

  if (loading) {
    return <p>Loading sensor data...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Sensors Data</h1>
      {sensors.length > 0 ? (
        sensors.map((sensor) => (
          <div key={sensor._id}>
            <p>Sensor ID: {sensor._id}</p>
            <p>Data: {sensor.data}</p>
            <p>Timestamp: {sensor.timestamp}</p>
          </div>
        ))
      ) : (
        <p>No sensors data available.</p>
      )}
    </div>
  );
};

export default Sensors;