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
              fill: true,
            },
          ],
        },
        options: {
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

  return <canvas ref={chartRef} />
  // return <canvas ref={chartRef} style={{ height: '30vh' }} />
}

export default SensorChartSingle