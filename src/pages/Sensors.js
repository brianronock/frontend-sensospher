import React, { useState, useEffect } from 'react';
import SensorChartSingle from '../components/SensorChart';

const Sensors = ({ socket }) => {
  const [temperatureData, setTemperatureData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);

  useEffect(() => {
    if (socket) {
      socket.on('sensorData', (data) => {
        if (data.type === 'temperature') {
          setTemperatureData((prevData) => [...prevData, { timestamp: new Date(), value: data.value }].slice(-50));
        } else if (data.type === 'humidity') {
          setHumidityData((prevData) => [...prevData, { timestamp: new Date(), value: data.value }].slice(-50));
        }
      });
    }

    return () => {
      if (socket) {
        socket.off('sensorData');
      }
    };
  }, [socket]);

  return (
    <div>
      <h1>Sensors Page</h1>
      <div className='sensorsWrapper'>
        <SensorChartSingle sensorData={temperatureData} label="Temperature (°C)" borderColor="rgba(75,192,192,1)" backgroundColor="rgba(75,192,192,0.2)" />
        <SensorChartSingle sensorData={humidityData} label="Humidity (%)" borderColor="rgba(153,102,255,1)" backgroundColor="rgba(153,102,255,0.2)" />
      </div>      
    </div>

  );
};

export default Sensors;