import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { MagnifyingGlassIcon, FunnelIcon  } from '@heroicons/react/24/outline';

const Sales = () => {
  const [userBill,setUserBill]=useState([]);
  const[supplierBill,setSupplierBill]=useState([]);
  const [profit,setProfit]=useState(0);
  const [bill,setBill]=useState(true);
  const dates=new Date();
  const paymentDate=new Date(dates.setDate(4)).toLocaleDateString() ;
  const [payment,setPayment]=useState(false);
     const [query,setQuery]=useState('');
     const [searchParams]=useSearchParams();
     const [searchProducts,setSearchProducts]=useState([])
     const [reservedDate,setReservedDate]=useState(paymentDate);
     const token = localStorage.getItem('token');
     const navigate=useNavigate();
   useEffect(
    ()=>{
 

      const employees=async()=>{
        try{
        const employeesData=await axios.get('http://localhost:3000/authority/salesData', 
            {headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}}
          )
          if(employeesData.data.length>0){
       setUserBill(employeesData.data);
          }
          else{
            alert('no data found');
          }
          const supplierData=await axios.get('http://localhost:3000/pages/supplierBills', 
            {headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}}
          )
          if(supplierData.data.length>0){
       setSupplierBill(supplierData.data);
          }
          else{
            alert('no data found');
          }
    
        }
        catch(error){
          console.log(error.message)
        }
        
      }
      employees();
    },[]
  )
    const handleSearch=()=>{
  if(query !==''){
    navigate(`/dashboard/inventory?q=${encodeURIComponent(query)}`)
  
    }
    } 
    useEffect(
      ()=>{
        const searchValue=searchParams.get('q');
  setQuery(searchValue);
  const getSearch=async()=>{
    try{
    const response=await axios.post('http://localhost:3000/pages/search',{query},{headers:{Authorization:`Bearer ${token}`}});
       setSearchProducts(response.data)
     }
    catch(error){
      console.log(message.error)
    }
  }
    getSearch()  },[query]
    )
  return (
    <div>
      <div className='sales-buttons-header'>
<button 
  onClick={() => { setBill(true); setPayment(false) }} 
  style={bill ? {color:'blue',cursor:'pointer',fontWeight:'bold',textDecoration:'underline'} : {}}>
  Bill
</button>

<button 
  onClick={() => { setBill(false); setPayment(true) }} 
  style={!bill ? {color:'blue',cursor:'pointer',fontWeight:'bold',textDecoration:'underline'} : {}}>
  Payment Received
</button>
  </div>
      <div className='bill' style={bill?{display:'grid'}:{display:'none'}}>
        <div className='inventory_nav'>
        {/* <p  className='staffList'>staff_List</p> */}
         
          <div className='inventory_nav-right-tab'>
    <input type='text' placeholder='search' className='inventory_nav-right-tab-search' onChange={(e)=>{setQuery(e.target.value)}}/>
<button type="submit" className="inventory_nav-right-tab-button" onClick={handleSearch}>
  <MagnifyingGlassIcon className="inline w-4 h-4" />
</button>
   <p><FunnelIcon className='inline w-4 h-4'/>filter</p>
    </div>
           
        </div>
 <section className='inventory-list'>
  <div className='sales-list-headers'>
    <p>RESERVATION ID</p>
    <p >NAME</p>
    <p>NUMBER OF BILL</p>
    <p>RESERVATION DATE</p>
    <p>TOTAL AMOUNT</p>
    <p>PAYMENT</p>
  </div>
  <hr />

  <div>
{
searchProducts.length>0?(

    searchProducts.map((searchProduct, index) => (
        <div className='sales-list-headers' key={index}>
         <p>{searchProduct.id}</p>
          <p className='price'>{searchProduct.name}</p>
          <p className='Qty'>{searchProduct.number}</p>
          
          <p className='weight'>{reservedDate}</p>
          <p>{searchProduct.amount}</p>
           <hr />
        </div>
      ))
     
):(

userBill.length > 0 || supplierBill.length > 0 ? (
  <>
    {
    userBill.length>0 &&
    userBill.map((detail, index) => (
        <div className='sales-list-headers' key={index}>
           <p>{detail.id}</p>
          <p>{detail.name}</p>
          <p>{detail.number}</p>
          <p>{reservedDate}</p>
          <p>{detail.amount}</p>
           <hr />
        </div>
      ))}
    {
      supplierBill.length>0 && (
      supplierBill.map((details,index)=>(
      
              <div className='productDetails' key={index}>

            <p>{details.id}</p>
          <p>{details.name}</p>
          <p>{details.number}</p>        
          <p>{reservedDate}</p>
          <p>{details.amount}</p>
           <hr />  
</div>
 
     ) ))}
  </>
    ) : (
      <>
        <div className='noProducts'>
          <h3>No Products Available</h3>
        </div>
        <hr />
      </>
    )

)

}

    
  </div>
</section>

      </div>

    </div>
  )
}

export default Sales
