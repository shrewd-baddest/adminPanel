import React,{useState,useEffect} from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const DoughnutChart = () => {
    const [labels,setLabels]=useState([]);
    const [values,setValues]=useState([]);
    useEffect(() => {
        fetch('http://localhost:3000/pages/chart-data',{headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}})
        .then(res=>res.json())
         .then(data => {
        const names = data.map(item => item.name);
        const vals = data.map(item => item.count);
        setLabels(names);
        setValues(vals);
      })
       .catch(err => console.error('Failed to fetch chart data:', err));
  }, []);
  
 console.log(values);

  const data2 = {
    labels:labels,
    datasets: [
      {
        label: 'Web Skills',
        data: values,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(181, 174, 156, 0.6)'
        ],
        borderWidth: 1
      }
    ]
  };
      
          
 
  const options2 = {
     responsive: true,
  maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Market Analysis'
      },
      legend: {
        position: 'bottom'
      }
    }
  }
 

  return (
    <div style={{width:'70%',height:'70%'}}>
  {labels.length > 0 && values.length > 0 ? (
      <Doughnut data={data2} options={options2} />
    ) : (
      <p>Loading chart...</p>
    )}  </div>);
};

export default DoughnutChart;
