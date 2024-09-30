/***********************************************************
    src/components/SensorChart.js
/********************************************************************************************************
Purpose:
`SensorChart.js` renders a real-time sensor data chart using the `Chart.js` library. It updates every 10 seconds and displays data within the last 60 seconds.

#Key Features:
	•	Filters and displays sensor data from the last 60 seconds.
	•	Automatically updates the chart every 10 seconds.
	•	Customizable chart appearance with dynamic labels and colors for temperature and humidity.
	•	Responsive design to fit within the parent container.

Function Flow:
	1.	Component Initialization: Registers Chart.js elements and sets up references for chart instances.
	2.	Data Filtering: Filters incoming sensorData to only include data from the last 60 seconds.
	3.	Chart Creation/Update:
	        •	If the chart instance exists, it updates the labels and data dynamically.
	        •	If no chart exists, it creates a new one with the filtered data and applies customizable labels and styles.
	4.	Periodic Updates: Sets up a setInterval to refresh the chart every 10 seconds to display updated sensor data.
	5.	Cleanup: Ensures that the chart instance is cleared when the component is unmounted.

This flow ensures the chart is always up-to-date and displays only the most recent sensor readings.
********************************************************************************************************/
import React, { useEffect, useRef } from 'react'
import { Chart, TimeScale, LinearScale, LineElement, PointElement, CategoryScale, Title, Tooltip, Legend, Filler, LineController } from 'chart.js'
import 'chartjs-adapter-luxon'

Chart.register(TimeScale, LinearScale, LineElement, PointElement, CategoryScale, Title, Tooltip, Legend, Filler, LineController)

const SensorChartSingle = ({ sensorData, label, borderColor, backgroundColor }) => {
  const chartRef = useRef(null)
  const chartInstanceRef = useRef(null)

  // Helper function to filter data from the last 60 seconds
  const getLastMinuteData = (data) => {
    const now = new Date()
    const oneMinuteAgo = new Date(now.getTime() - 60 * 1000) // 60 seconds ago
    return data.filter((dataPoint) => new Date(dataPoint.timestamp) >= oneMinuteAgo) // Only keep data from the last 60 seconds
  }

  useEffect(() => {
    if (!sensorData || sensorData.length === 0) return  // Avoid processing if no data

    const filteredData = getLastMinuteData(sensorData)  // Filter data within the last minute

    if (chartInstanceRef.current) {
      // Update the chart with the latest data
      chartInstanceRef.current.data.labels = filteredData.map((dataPoint) => dataPoint.timestamp) // Replace the timestamps
      chartInstanceRef.current.data.datasets[0].data = filteredData.map((dataPoint) => dataPoint.value) // Replace the data

      chartInstanceRef.current.update() // Re-render only the updated parts
    } else {
      // Create a new chart instance if none exists
      const chartInstance = new Chart(chartRef.current, {
        type: 'line',
        data: {
          labels: filteredData.map((dataPoint) => dataPoint.timestamp), // Use timestamps for the x-axis
          datasets: [
            {
              label: label, // Dynamic label (Temperature or Humidity)
              data: filteredData.map((dataPoint) => dataPoint.value), // Dynamic data
              borderColor: borderColor, // Dynamic border color
              backgroundColor: backgroundColor, // Dynamic background color
              borderWidth: 0.5,
              fill: true,
              pointRadius: 3, 
              pointHoverRadius: 10,  
              pointBorderColor: borderColor, 
              pointBackgroundColor: backgroundColor, 

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
                unit: 'second',  // Show time in seconds
                stepSize: 10,    // Show the label every 10 seconds
              },
              ticks: {
                autoSkip: true, // Auto-skip labels if necessary to avoid clutter
                maxTicksLimit: 6,  // Max number of ticks shown (to prevent overcrowding)
              },
              title: {
                display: true,
                text: 'Last 1 minute',
              },
            },
            y: {
              title: {
                display: true,
                text: label,
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
  }, [sensorData, backgroundColor, borderColor, label])

  // Set up periodic re-render every 10 seconds to refresh the data
  useEffect(() => {
    const interval = setInterval(() => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.update()
      }
    }, 10000) // Update every 10 seconds

    return () => clearInterval(interval) // Clean up the interval on component unmount
  }, [])

  return <canvas ref={chartRef} style={{ height: '20vh' }} />
  // return <canvas ref={chartRef} style={{ height: '30vh' }} />
}

export default SensorChartSingle