import React,{useState,useRef, useEffect} from 'react'
import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import { MagnifyingGlassIcon, FunnelIcon  } from '@heroicons/react/24/outline';
import axios from 'axios';

const Staff = () => {
  const navigate=useNavigate();
  // const staffs=useLoaderData();
  const [paid,setPaid]=useState();
  const [price,setPrice]=useState(0);
  const [number, setNumber] = useState('');
  const [staffs,setStaffs]=useState([]);
  const [id, setId] = useState('');
      const token = localStorage.getItem('token');

  const body_blur=useRef();
  const pay=useRef();
  useEffect(
    ()=>{
staffsDetails()
    },[]
  );
const staffsDetails=async()=>{
    const token = localStorage.getItem('token');
     try {
 const response=await fetch('https://adminpanel-8j8g.onrender.com/pages/staffDetails',{
  headers:{
    Authorization:`Bearer ${token} `
  }}
)
const data=await response.json();
    if (!Array.isArray(data)) {
     alert(data.message);
      return [];
    }

    return setStaffs(data);

}     catch (error) {
        throw new Error("error.message");
        
    }
}

  const Initialise_payment = (details) => {
  body_blur.current.style.filter = 'blur(4px)';
  document.body.style.overflow = 'hidden';
  pay.current.style.display = 'block';
  setPrice(details.amount);
  setNumber(details.number);
  setId(details.id);
}
 const payment=async()=>{
  const paymentData = {
     Id: id,
    phoneNumber: number,
    price: price,
  };

  try {
    // 1. Send payment request to backend
    const res = await axios.post('https://adminpanel-8j8g.onrender.com/pages/payment', paymentData, {
          headers: { Authorization: `Bearer ${token}` }});
     if (res.data.status === 'success') {
      // 2. Wait 10 seconds to give M-Pesa time to send callback
      await new Promise(resolve => setTimeout(resolve, 10000));
      alert('payment successful');
        await staffsDetails();
      navigate('/dashboard');
     }
      }
      catch(error){
        console.error(error.message);
      }
    }
    
  return (
     <div className='inventory' ref={body_blur}>
      
        <div className='headings'>
        <h3 className='Htitle'>Products</h3>
        <button  onClick={()=>navigate('/dashboard/addStaff')} className='Hbutton'>+Add staff</button>
      </div>
      <div className='display-bar'>
        <p> total staffs</p>
        <h2>{staffs.length}</h2>
      </div>
      <div className='inventory_nav'>
        <p  className='staffList'>staff_List</p>
         
          <div className='inventory_nav-right-tab'>
    <input type='text' placeholder='search' className='inventory_nav-right-tab-search'/>
<button type="submit" className="inventory_nav-right-tab-button">
  <MagnifyingGlassIcon className="inline w-4 h-4" />
</button>
   <p><FunnelIcon className='inline w-4 h-4'/>filter</p>
    </div>
           
        </div>
         <div className='staff-list-headers'>
    <p>Image</p>
    <p className='id'>Staff-Id</p>
    <p className='name'>Name</p>
    <p className='number'>Number</p>
    <p className='role'>Role</p>
    <p className='amount'>Amount</p>
    <p className='payment'>Payment</p>
    
  </div>
  <hr />

  <div>
           {staffs.length > 0 ? (
      staffs.map((detail) => (
        <div className='productDetails' key={detail.id}>
          {/* Add image if available */}
          {detail.passport && (
            <img src={detail.passport} alt={detail.name} className="staff-image" />
          )}
          <p className='id'>{detail.id}</p>
          <p className='name'>{detail.name}</p>
          <p className='number'>{detail.number}</p>
          <p className='role'>{detail.role}</p>
          <p className='amount'>{detail.amount}</p>
          <button className='payment'
            onClick={() => {
              if (detail.status === 'unpaid') {
                Initialise_payment(detail)
              } else if (detail.status === 'paid') {
                alert('Already paid');
              }
            }}
          >{detail.status}</button>
          <hr />
        </div>
      ))
    ) : (
      <>
        <div className='noProducts'>
          <h3>No Products Available</h3>
        </div>
        <hr />
      </>
    )}
  </div>
       <div className="pay_form" ref={pay}>
                    <div>
                      <button title='close' className='close'onClick={()=>{pay.current.style.display='none';
                         document.body.style.overflow = 'auto';
                      body_blur.current.style.filter='blur(0px)';
}}>x</button>
        <p className='cart-psg'>you can securely make payment</p>
              <p className='cart-price'>Ksh:{price!=null?price.toFixed(2):'0.00'}</p>
                    </div>
                  <form onSubmit={e => { e.preventDefault(); payment(); }} >
                    <div className='payment-form'>    
              <input
  type="tel"
  value={number}
  onChange={e => setNumber(e.target.value)}
  className='payment-input'
/>
  </div>
<button className='pay' type="submit" disabled={!number}>Submit</button>
      </form>
            </div>
    </div>
    
  )
}

export default Staff
