import React, { useState, useEffect } from 'react'
import { Line,Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale,ArcElement,
     LinearScale, PointElement,
     LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale,ArcElement,
     LinearScale, PointElement,
      LineElement, Title, Tooltip, Legend);
      export  const AnalyticsChart = () => {
           const [chartData, setChartData] = useState([]);
          useEffect(() => {
        fetch('https://adminpanel-8j8g.onrender.com/pages/salesTrends',{headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}})
        .then(res=>res.json())
                .then(data => {
                    setChartData(data);
                })
                .catch(err => console.error('Failed to fetch chart data:', err));
    }, []);

    const data = {
        labels: chartData ? chartData.map(item => item.sale_date) : [],
        datasets: [
            {
                label: 'Sales Trends',
                data: chartData ? chartData.map(item => item.total_sales) : [],
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1
            }
        ]}
   const options = {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Sales Trends Over Time'
                },
                legend: {
                    position: 'top'
                }
            },  
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Date'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Sales'
                    }
                }
            }
        };




  return (
    <div><Line data={data} options={options} /></div>
  )
}

 export const ProductCategory=()=>{
      const [cate,setCate]=useState([]);

    const category=async()=>{
        try {
          const response = await fetch("https://adminpanel-8j8g.onrender.com/pages/productTypes", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          const data = await response.json();
          setCate(data);
        //   console.log(data);
        } catch (error) {
          console.error('Failed to fetch product categories:', error);
        }
      };

      useEffect(() => {
        category();
        }, []);
        const data={
            labels: cate.map(item => item.category_name),
            datasets: [
                {
                    label: 'Product Categories',
                    data: cate.map(item => item.sale_count),
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ]
                }
            ]
        };
         
  const options = {
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

    

return(
    <div style={{width:'70%',height:'70%'}}>
        <Doughnut data={data} options={options} />
    </div>
)



 }