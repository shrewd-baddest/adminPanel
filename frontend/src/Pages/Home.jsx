

import React, { useEffect, useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import LineChart from '../Charts/LineChart';
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

import { Bars3Icon, XMarkIcon,CogIcon,HomeIcon,UserIcon,ShoppingCartIcon,ChartBarIcon } from '@heroicons/react/24/outline' 
import DoughnutChart from '../Charts/DoughnutCharts';
const Home = () => {
  const products=useLoaderData()
  console.log(products);
  const [open, setOpen] = useState(false);
  const [revenue,setRevenue]=useState(0);
  const [order,setOrder]=useState(0);
  const [customers,setCustomers]=useState(0);
  const [delivery,setDelivery]=useState(0);
  const [summarised,setSummarised]=useState([]);
  const token=localStorage.getItem('token');
  const catalog=[{name:'Dashboard', icon:HomeIcon}, 
    {name:'Inventory',icon:ShoppingCartIcon},{name:'Sales',icon:ChartBarIcon},{name:'Reports', icon: ChartBarIcon},{name:'staff',icon:UserIcon},
    {name:'Customers',icon:UserIcon},{name: 'Settings',icon:CogIcon}];
    useEffect(
    ()=>{
const summary = async () => {
  try {
    const T_order = await fetch('http://localhost:3000/pages/orders', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const orderData = await T_order.json();
    setOrder(orderData);

    const T_customers = await fetch('http://localhost:3000/pages/customers', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const customerData = await T_customers.json();
    setCustomers(customerData);

    const T_delivery = await fetch('http://localhost:3000/pages/delivery', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const deliveryData = await T_delivery.json();
    setDelivery(deliveryData);

    // Combine into one array and set it once
    setSummarised([
      { name: "Orders", count: orderData.count },
      { name: "Customers", count: customerData.count },
      { name: "Deliveries", count: deliveryData.count }
    ]);
  } catch (error) {
    console.log("Summary error:", error.message);
  }
}
   summary();
    
    },
    []
    )
    useEffect(()=>{
  gsap.timeline({
        scrollTrigger:{
          trigger:'.thirty_days',
          start:'top 0%',
          
        }
      }).fromTo('.most_sold',{
    x:-100,
opacity:0,
ease:'elastic.inOut',
  stagger:{
      axis:'x',
    grid:'auto',
    each:2
  }
} ,
  {
    opacity:1,
    x:0,
  }
);
 
    },[products])
  return (
    <div   className='home'>
      <button
        className='focus:outline-none'
        onClick={() => setOpen(!open)}
      >
        {open ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
      </button>

      <div className="grp">
        <section className="catalog">
          <ul className='categories hidden md:grid '>

          {catalog.map((item, index) => (
            <li className="card" key={index}>
              <Link to={`/dashboard/${item.name.toLowerCase()}`}>
              <item.icon className='inline h-4 w-4'/>
              {item.name} <span>&gt;</span></Link>
            </li>
          ))}
          </ul>
          <div>

<ul className='categories grid'>

          {catalog.map((item, index) => (
            <li className="card" key={index}>
<Link to={`/dashboard/${item.name.toLowerCase()}`}>
  <item.icon className="inline h-4 w-4 md:hidden" title={item.name} />
  <div className={`md:hidden ${open ? 'grid' : 'hidden'} grid-cols-1 gap-4 p-4`}>
  {item.name} <span>&gt;</span>
  </div>
</Link>            </li>
          ))}
          </ul>
          </div>
        </section>
        <section className='markets'>
          <div className='thirty'>
          {
summarised.map((item, index) => (
           <div className="thirty_days" key={index}>
     <h4>{item.name}</h4>
     <p>last 30 days</p>
     <h2>{item.count}</h2>
          </div>
)          )}
          </div>
          <div className='market-charts'>
            <div  className='doughnut'>
            <h3>Market Analysis</h3>
            <DoughnutChart key='Doughnut_chart'/>
          </div>
          <div className='line'>
            <h3>
              Sales Analytics
            </h3>
            <LineChart key='linechart'/>
          </div>
          </div>
          <div className='mostSold'>
            <h2 style={{textAlign:'center'}}>Most Sold Products</h2>
            {
     Array.isArray(products) ? ( products.map((product)=>(
              <div key={product.products_id} className='most_sold'>
 <img 
     src={product.image_url} loading="lazy" />
     <p> {product.products_name} </p><p className='quant'>{product.weight_ml} ml</p>
     <p className='price'>Ksh:{product.price}</p>
      
              </div>
           ) )) : ( <p>No products found  </p>
          //  {alert('please log in again')}
)}
          </div>
        </section>
      </div>
    </div>
          ) 

}

export default Home


export const most_sold=async()=>{

try{
  const token=localStorage.getItem('token');
const response=await fetch('http://localhost:3000/pages/MostSold',{
  headers:{
    Authorization:`Bearer ${token} `
  }}
)
const data=await response.json();
    if (!Array.isArray(data)) {
      console.warn('Expected array but got:', data);
      return [];
    }

    return data;

}
catch(error){
  console.log(error.message);
}


}