import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const BarChart = () => {
  const [chartData, setChartData] = useState(null);

  const [labels,setLabels]=useState([]);
      const [values,setValues]=useState([]);
      useEffect(() => {
          fetch('https://adminpanel-8j8g.onrender.com/pages/chart-data')
          .then(res=>res.json())
             .then(data => {
              const datas= data;

        const names = data.map(item => item.name);
        const vals = data.map(item => item.value);
        setChartData(datas);
        setLabels(names);
        setValues(vals);
      })
       .catch(err => console.error('Failed to fetch chart data:', err));
  }, []);

        const chart = {
          labels: labels,
          datasets: [
            {
              label: 'yogoBlast progress',
              data: values,
              backgroundColor: 'rgba(54, 162, 235, 0.6)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            }
          ]
        };
       
       

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div>
      {chartData ? <Bar key='chart1' data={chart} options={options} /> : <p>Loading chart...</p>}
    </div>
  );
};

export default BarChart;
