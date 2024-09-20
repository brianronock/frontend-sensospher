/***********************************************************
 * Sensors.js
 * Page displaying sensor data.
 ***********************************************************/
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSensorData } from '../redux/slices/sensorSlice';

const Sensors = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.sensor);

  useEffect(() => {
    dispatch(fetchSensorData());
  }, [dispatch]);

  if (loading) {
    return <p>Loading sensor data...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Sensors</h1>
      <ul>
        {data.map((sensor) => (
          <li key={sensor._id}>
            {sensor.name}: {sensor.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sensors;