// import { useEffect, useState } from 'react';

// const Dashboard = ({ socket }) => {
//   const [sensorData, setSensorData] = useState([]);
//   const [latestTemperature, setLatestTemperature] = useState(null); // Store the latest temperature
//   const [latestHumidity, setLatestHumidity] = useState(null);       // Store the latest humidity

//   useEffect(() => {
//     if (socket) {
//       socket.on('sensorData', (data) => {
//         if (data.type === 'temperature') {
//           setLatestTemperature(data.value); // Update temperature
//         } else if (data.type === 'humidity') {
//           setLatestHumidity(data.value);    // Update humidity
//         }
//       });
//     }

//     return () => {
//       if (socket) {
//         socket.off('sensorData'); // Clean up listener on unmount
//       }
//     };
//   }, [socket]);

//   // Whenever temperature or humidity changes, update sensor data only if both are available
//   useEffect(() => {
//     if (latestTemperature !== null && latestHumidity !== null) {
//       const timestamp = new Date().toISOString();

//       setSensorData((prevData) => [
//         ...prevData,
//         {
//           timestamp,
//           temperature: latestTemperature,
//           humidity: latestHumidity,
//         },
//       ]);

//       // Reset temperature and humidity to wait for new updates
//       setLatestTemperature(null);
//       setLatestHumidity(null);
//     }
//   }, [latestTemperature, latestHumidity]);

//   return (
//     <div>
//       <h1>Dashboard</h1>
//       {sensorData.length > 0 ? (
//         <ul>
//           {sensorData.map((data, index) => (
//             <li key={index}>
//               {`Time: ${data.timestamp}, Temperature: ${data.temperature !== null ? data.temperature : 'N/A'}°C, Humidity: ${data.humidity !== null ? data.humidity : 'N/A'}%`}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No sensor data available.</p>
//       )}
//     </div>
//   );
// };

// export default Dashboard;


import React, { useEffect, useState } from 'react';
import SensorChartSingle from './SensorChart';
import LiveFeed from './LiveFeed';

const Dashboard = ({ socket }) => {
  const [temperatureData, setTemperatureData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);

  useEffect(() => {
    if (socket) {
      socket.on('sensorData', (data) => {
        if (data.type === 'temperature') {
          setTemperatureData((prevData) => [...prevData.slice(-49), { timestamp: new Date(), value: data.value }]); // Keep last 50 data points
        } else if (data.type === 'humidity') {
          setHumidityData((prevData) => [...prevData.slice(-49), { timestamp: new Date(), value: data.value }]); // Keep last 50 data points
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
    <div className="sensorsWrapper2">
      <h1>Dashboard</h1>
      <LiveFeed />
      <div className="chartContainer2">
        <SensorChartSingle
          sensorData={temperatureData}
          label="Temperature (°C)"
          borderColor="rgba(75,192,192,1)"
          backgroundColor="rgba(75,192,192,0.2)"
        />
      </div>
      <div className="chartContainer">
        <SensorChartSingle
          sensorData={humidityData}
          label="Humidity (%)"
          borderColor="rgba(153,102,255,1)"
          backgroundColor="rgba(153,102,255,0.2)"
        />
      </div>
    </div>
  );
};

export default Dashboard;