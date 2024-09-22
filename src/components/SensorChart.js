// import React, { useEffect, useRef } from 'react';
// import { Chart, TimeScale, LinearScale, LineElement, PointElement, CategoryScale, Title, Tooltip, Legend, LineController, Filler } from 'chart.js'; 
// import 'chartjs-adapter-luxon';

// Chart.register(LineController, TimeScale, LinearScale, LineElement, PointElement, CategoryScale, Title, Tooltip, Legend, Filler);

// const SensorChartSingle = ({ sensorData, label, borderColor, backgroundColor }) => {
//   const chartRef = useRef(null);
//   const chartInstanceRef = useRef(null);

//   useEffect(() => {
//     if (!sensorData || sensorData.length === 0) return;

//     if (chartInstanceRef.current) {
//       chartInstanceRef.current.destroy();
//     }

//     const chartInstance = new Chart(chartRef.current, {
//       type: 'line',
//       data: {
//         labels: sensorData.map((dataPoint) => dataPoint.timestamp),
//         datasets: [
//           {
//             label,
//             data: sensorData.map((dataPoint) => dataPoint.value),
//             borderColor,
//             backgroundColor,
//             fill: true,
//           },
//         ],
//       },
//       options: {
//         scales: {
//           x: {
//             type: 'time',
//             time: {
//               unit: 'minute',
//             },
//             title: {
//               display: true,
//               text: 'Time',
//             },
//           },
//           y: {
//             title: {
//               display: true,
//               text: 'Values',
//             },
//           },
//         },
//         plugins: {
//           legend: {
//             display: true,
//             position: 'top',
//           },
//         },
//       },
//     });

//     chartInstanceRef.current = chartInstance;

//     return () => {
//       chartInstance.destroy();
//     };
//   }, [sensorData]);

//   return <canvas ref={chartRef} style={{ height: '25vh'}}/>;
// };

// export default SensorChartSingle;




import React, { useEffect, useRef } from 'react';
import { Chart, TimeScale, LinearScale, LineElement, PointElement, CategoryScale, Title, Tooltip, Legend, Filler, LineController } from 'chart.js';
import 'chartjs-adapter-luxon';

Chart.register(TimeScale, LinearScale, LineElement, PointElement, CategoryScale, Title, Tooltip, Legend, Filler, LineController);

const SensorChartSingle = ({ sensorData, label, borderColor, backgroundColor }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (!sensorData || sensorData.length === 0) return;  // Avoid processing if no data

    if (chartInstanceRef.current) {
      // Update the chart with the latest data
      chartInstanceRef.current.data.labels.push(sensorData[sensorData.length - 1].timestamp); // Add the latest timestamp
      chartInstanceRef.current.data.datasets[0].data.push(sensorData[sensorData.length - 1].value); // Add the latest value (temperature or humidity)

      chartInstanceRef.current.update(); // Re-render only the updated parts
    } else {
      // Create a new chart instance if none exists
      const chartInstance = new Chart(chartRef.current, {
        type: 'line',
        data: {
          labels: sensorData.map((dataPoint) => dataPoint.timestamp), // Use timestamps for the x-axis
          datasets: [
            {
              label: label, // Dynamic label (Temperature or Humidity)
              data: sensorData.map((dataPoint) => dataPoint.value), // Dynamic data for temperature or humidity
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
                unit: 'minute',
              },
              title: {
                display: true,
                text: 'Time',
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
      });
      chartInstanceRef.current = chartInstance; // Store the chart instance
    }
  }, [sensorData, backgroundColor, borderColor, label]);

  return <canvas ref={chartRef} style={{ height: '30vh'}} />;
};

export default SensorChartSingle;