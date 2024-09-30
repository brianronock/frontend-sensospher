import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSensors } from '../redux/slices/sensorSlice' // Historical data slice
import { updateTemperatureData, updateHumidityData } from '../redux/slices/sensorRealTimeSlice' // Real-time data slice
import SensorChartSingle from '../components/SensorChart'
import SensorChartHistorical from '../components/SensorChartHistorical' // New component for historical data

const Sensors = ({ socket }) => {
  const dispatch = useDispatch()
  
  // Access both real-time data and historical data from Redux store
  const { sensors, loading } = useSelector((state) => state.sensor)  // Historical data
  const { temperatureData, humidityData } = useSelector((state) => state.sensorRealTime)  // Real-time data

  useEffect(() => {
    // Fetch historical sensor data when the component mounts
    dispatch(fetchSensors())
  
    const handleSensorData = (data) => {
      // Convert the timestamp to ISO string before dispatching
      const newData = { timestamp: new Date().toISOString(), value: data.value }
      
      if (data.type === 'temperature') {
        dispatch(updateTemperatureData(newData))  // Update real-time temperature
      } else if (data.type === 'humidity') {
        dispatch(updateHumidityData(newData))  // Update real-time humidity
      }
    }
  
    if (socket) {
      socket.on('sensorData', handleSensorData)
    }
  
    return () => {
      if (socket) {
        socket.off('sensorData', handleSensorData)
      }
    }
  }, [socket, dispatch])

  // Combine real-time and historical data for the historical chart
  const combinedData = [
    ...sensors, 
    ...temperatureData.map(data => ({ ...data, type: 'temperature' })), 
    ...humidityData.map(data => ({ ...data, type: 'humidity' }))
  ]

  // Limit combined data to the last 10 minutes for the historical chart
  const now = new Date()
  const tenMinutesAgo = new Date(now.getTime() - 10 * 60 * 1000) // 10 minutes ago
  const recentCombinedData = combinedData.filter((dataPoint) => new Date(dataPoint.timestamp) >= tenMinutesAgo)

  return (
    <div>
      <h1>Sensors</h1>
      {loading && <p>Loading historical sensor data...</p>}
      <div className='sensorsWrapper'>
        <div className='sensor realTimeSensor'>
        {/* Real-time Temperature */}
          <SensorChartSingle 
              sensorData={temperatureData} 
              label="Temperature (°C)" 
              borderColor="rgba(75,192,192,1)" 
              backgroundColor="rgba(75,192,192,0.2)" 
            />        
        </div>
        <div className='sensor realTimeSensor'>
          {/* Real-time Humidity */}
          <SensorChartSingle 
            sensorData={humidityData} 
            label="Humidity (%)" 
            borderColor="rgba(153,102,255,1)" 
            backgroundColor="rgba(153,102,255,0.2)" 
          />       
        </div>
        <div className='sensor historicalSensor'>
            {/* Historical Data (Both Temperature and Humidity) */}
            <SensorChartHistorical 
              sensorData={recentCombinedData} // Pass recent data here
              borderColorTemperature="rgba(75,192,192,1)" 
              borderColorHumidity="rgba(153,102,255,1)" 
              backgroundColorTemperature="rgba(75,192,192,0.2)" 
              backgroundColorHumidity="rgba(153,102,255,0.2)" 
            />       
        </div>
      </div>      
    </div>
  )
}

export default Sensors