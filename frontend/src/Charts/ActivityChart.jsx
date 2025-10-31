import React,{useEffect,useState} from 'react'
import { Bar, } from 'react-chartjs-2';
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

const ActivityChart = () => {
 const [chartData, setChartData] = useState(null);

  const [labels,setLabels]=useState([]);
      const [values,setValues]=useState([]);
      useEffect(() => {
          fetch('https://adminpanel-8j8g.onrender.com/pages/revenue')
          .then(res=>res.json())
             .then(data => {
        const names = Object.keys(data);
        const vals = Object.values(data);
        setLabels(names);
        setValues(vals);
         console.log({names,vals})
      })
       .catch(err => console.error('Failed to fetch chart data:', err));
 }, []);

        const data2 = {
          labels: labels,
          datasets: [
            {
              label: 'yogoBlast activity report',
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
    <div style={{width:'70%',height:'70%'}}>
  {labels.length > 0 && values.length > 0 ? (
      <Bar data={data2} options={options} />
    ) : (
      <p>Loading chart...</p>
    )}  </div>);
}

export default ActivityChart
