import React,{useState,useEffect} from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
   PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title
} from 'chart.js';

ChartJS.register(CategoryScale,LinearScale, PointElement,LineElement, Tooltip, Legend, Title);

const LineChart = () => {
    const [labels,setLabels]=useState([]);
    const [values,setValues]=useState([]);
    useEffect(() => {
        fetch('http://localhost:3000/pages/sales',{headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}})
        .then(res=>res.json())
             .then(data => {
        const names = data.map(item => item.name);
        const vals = data.map(item => item.value);
        setLabels(names);
        setValues(vals);
      })
       .catch(err => console.error('Failed to fetch chart data:', err));
  }, []);
  const data3 = {
    labels:labels,
    datasets: [
        {
          label: 'Sales Analysis',
    data: values,
    fill: false,
    borderColor: 'rgba(54, 162, 235, 1)', 
    backgroundColor: 'rgba(54, 162, 235, 0.2)',  
    tension: 0.4
      }
    ]
  };

  const options3 = {
       responsive: true,
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart',
    },
    plugins: {
      title: {
        display: true,
       },
      legend: {
        position: 'top'
      }
    }
  }
 

  return (
    <div style={{width:'100%',height:'100%'}}>
        {labels.length > 0 && values.length > 0 ? (
  <Line  data={data3} options={options3} />
    ) : (
      <p>Loading chart...</p>
    )}
  </div>
  )
};

export default LineChart;
