/***********************************************************
    src/components/SensorChartHistorical.js
/********************************************************************************************************
Purpose:
`SensorChartHistorical.js` visualizes historical sensor data for both temperature and humidity over the past 10 minutes.

Key Features:
	•	Displays both temperature and humidity trends over time.
	•	Dynamic updates: Automatically updates the chart when new data is available.
	•	Customizable colors for temperature and humidity lines.
	•	Smooth transitions and animations for chart updates.

Function Flow:
	1.	Component Initialization: Chart.js is registered, and a useRef is used to hold the chart instance.
	2.	Data Processing: Filters the incoming sensorData into temperature and humidity arrays.
	3.	Chart Creation/Update:
	•	If no chart exists, a new line chart is created using timestamps as x-axis labels.
	•	If the chart exists, it updates the datasets and labels dynamically.
	4.	Rendering: The chart is rendered in a canvas element using the ref.

********************************************************************************************************/
import React, { useEffect, useRef } from 'react'
import { Chart, TimeScale, LinearScale, LineElement, PointElement, CategoryScale, Title, Tooltip, Legend, Filler, LineController } from 'chart.js'
import 'chartjs-adapter-luxon'

Chart.register(TimeScale, LinearScale, LineElement, PointElement, CategoryScale, Title, Tooltip, Legend, Filler, LineController)

const SensorChartHistorical = ({ sensorData, borderColorTemperature, borderColorHumidity, backgroundColorTemperature, backgroundColorHumidity }) => {
  const chartRef = useRef(null)
  const chartInstanceRef = useRef(null)

  useEffect(() => {
    const temperatureData = sensorData.filter((dataPoint) => dataPoint.type === 'temperature')
    const humidityData = sensorData.filter((dataPoint) => dataPoint.type === 'humidity')

    if (chartInstanceRef.current) {
      // Update the chart with the latest data
      chartInstanceRef.current.data.labels = temperatureData.map((dataPoint) => dataPoint.timestamp)
      chartInstanceRef.current.data.datasets[0].data = temperatureData.map((dataPoint) => dataPoint.value)
      chartInstanceRef.current.data.datasets[1].data = humidityData.map((dataPoint) => dataPoint.value)
      chartInstanceRef.current.update() // Re-render only the updated parts
    } else {
      // Create a new chart instance for historical data
      const chartInstance = new Chart(chartRef.current, {
        type: 'line',
        data: {
          labels: temperatureData.map((dataPoint) => dataPoint.timestamp), // Use timestamps for the x-axis
          datasets: [
            {
              label: 'Temperature (°C)',
              data: temperatureData.map((dataPoint) => dataPoint.value), // Temperature data
              borderColor: borderColorTemperature,
              backgroundColor: backgroundColorTemperature,
              borderWidth: 0.5,
              fill: true,
              pointRadius: 1.5,   // Set the size of the points
              pointHoverRadius: 7,  // Size when hovered
              pointBorderColor: borderColorTemperature, // Border color for points
              pointBackgroundColor: backgroundColorTemperature, 
            },
            {
              label: 'Humidity (%)',
              data: humidityData.map((dataPoint) => dataPoint.value), // Humidity data
              borderColor: borderColorHumidity,
              backgroundColor: backgroundColorHumidity,
              borderWidth: 0.5,
              fill: true,
              pointRadius: 1.5,   // Set the size of the points
              pointHoverRadius: 7,  // Size when hovered
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'minute',  // Use minutes
              },
              title: {
                display: true,
                text: 'Time (Last 10 Minutes)',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Values',
              },
            },
          },
          plugins: {
            legend: {
              display: true,
              position: 'top',
            },
          },
        },
      })
      chartInstanceRef.current = chartInstance // Store the chart instance
    }
  }, [sensorData, backgroundColorHumidity, backgroundColorTemperature, borderColorTemperature, borderColorHumidity])

  return <canvas ref={chartRef } style={{ height: '30vh' }}/>
//   return <canvas ref={chartRef} style={{ height: '30vh' }} />
}

export default SensorChartHistorical