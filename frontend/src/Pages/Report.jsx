import React, { useEffect, useState } from 'react'
import BarChart from '../Charts/BarChart'
import ActivityChart from '../Charts/ActivityChart'
import { AnalyticsChart,ProductCategory } from '../Charts/AnalyticsChart'
import jsPDF from 'jspdf'
const Report = () => {
  const [active, setActive] = useState('Data OverView')
  const [sales,setSales]=useState([]);
  const token=localStorage.getItem('token');
  const [salesReport,setSalesReport]=useState([])
  const [analyticsData, setAnalyticsData] = useState(null);
    useEffect(
    ()=>{
const overviews=async()=>{
    const T_order = await fetch('https://adminpanel-8j8g.onrender.com/pages/sales', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const salesData = await T_order.json();
    setSales(salesData)
 }
 overviews()  },
    []
  )

  const renderContent = () => {
      // const token=localStorage.getItem('token');
    switch (active) {
      case 'Data OverView':
        return (
          <>
            <h2>Data for this Month</h2>
            <BarChart key="BarChart" />
            <div>
              <p>Transaction Activities</p>
     
            </div>
          </>
        )
        // break;
      case 'Activity':
        return (
          <>
            <h2>Activities Taken</h2>
            <ActivityChart />
          </>
        )
        // break;
      case 'Analytics':
        {
          fetch("https://adminpanel-8j8g.onrender.com/pages/revenue", {
                headers: { Authorization: `Bearer ${token}` },
              }).then(response =>
               response.json()).then(data => {
              setAnalyticsData(data);
            }).catch(error => {
              console.error("Error fetching analytics data:", error.message);
            });
        }
      
        return (
        <>
        <div className='key-metrics'>

        <h2>Total Revenue: {analyticsData?.totalRevenue}</h2>
        <h2>Total Orders: {analyticsData?.totalOrders}</h2>
        <h2>Average Order Value: {analyticsData?.averageOrderValue}</h2>
        <h2>Top Selling Product: {analyticsData?.topSellingProduct}</h2>
        </div>
        <div className='analytics-charts'>
    <h3>Sales Over Time</h3>
   <AnalyticsChart />
    <ProductCategory/> 
        </div>
        </>)
        
case "Data Export":
  {
  const salesPDF = async () => {
    try {
      const response = await fetch("https://adminpanel-8j8g.onrender.com/pages/salesReport", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const Sreport=await response.json();
      // console.log(Sreport);
      setSalesReport(Sreport);

      const doc = new jsPDF();
      doc.setFontSize(16);
      doc.text("Sales Report", 10, 10);

      let y = 20;
      Sreport.forEach((sale, index) => {
        doc.text(
          
          `${index + 1}. Customer: ${sale.customer_id} | Order: ${
            sale.order_id
          } | Qty: ${sale.quantity} | Price: ${sale.price} | Total: ${
            sale.total_price
          }`,
          10,
          y
        );
        if (y > 280) {
  doc.addPage();
  y = 20;
}
  else {
        y += 10;

  }
      });

      doc.save("sales_report.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error.message);
    }
  };
            console.log(salesReport);


  return (
    <>
      <h2>Export your data here...</h2>
      <button
        onClick={salesPDF}
        className="px-4 py-2 mt-4 text-white bg-red-500 rounded-lg"
      >
        Download salesReport PDF
      </button>
    <div className="reportList">
  {/* Headings */}
  <div className="reportRow header">
    <p>Customer Id</p>
    <p>Customer Name</p>
    <p>Order Id</p>
    <p>Products Name</p>
    <p>Quantity</p>
    <p>Price</p>
    <p>Total Price</p>
  </div>

  {/* Data Rows */}
  {

  salesReport && salesReport.length > 0 ? (
    salesReport.map((sales, index) => (
      <div className="reportRow" key={sales.order_id || index}>
        <p>{sales.customer_id}</p>
        <p>{sales.customer_name}</p>
        <p>{sales.order_id}</p>
        <p>{sales.products_name}</p>
        <p>{sales.quantity}</p>
        <p>{sales.price}</p>
        <p>{sales.total_price}</p>
      </div>
    ))
  ) : (
    <p>Loading data...</p>
  )}
</div>

    </>
  );
  

}

      default:
        return <p>Wait for the report to load</p>
    }
  }

  return (
    <div className="reports">
      <h1>Reports</h1>
      <div className="report-buttons">
        <p onClick={() => setActive('Data OverView')} style={active === 'Data OverView' ? { color: 'blue', textDecoration: 'underline' } : {}}>Data OverView</p>
        <p onClick={() => setActive('Activity')} style={active === 'Activity' ? { color: 'blue', textDecoration: 'underline' } : {}}>Activities</p>
        <p onClick={() => setActive('Analytics')} style={active === 'Analytics' ? { color: 'blue', textDecoration: 'underline' } : {}}>Analytics</p>
        <p onClick={() => setActive('Data Export')} style={active === 'Data Export' ? { color: 'blue', textDecoration: 'underline' } : {}}>Data Export</p>
      </div>
<hr/>
<div className='report-display'>
      {renderContent()}
    </div>
  </div>
  )

}

export default Report
 