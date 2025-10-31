import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {BriefcaseIcon, NewspaperIcon,CheckIcon} from '@heroicons/react/24/outline'

import axios from 'axios';
const Addstaff = () => {

    const [staffName,setStaffName]=useState('');
    const [role,setRole]=useState('');
    const [id,setId]=useState('');
    const [payment,setPayment]=useState(0);
    const [password,setPassword]=useState('');
    const [amount,setAmount]=useState(0);
    const [image,setImage]=useState('');

    const [email,setEmail]=useState('');
    const navigate=useNavigate();
      const handleSubmit=async(e)=>{
         e.preventDefault();
if (!staffName || !role || !id || !payment || !password || !amount || !email || !image) {
  return alert('Please fill all the fields and upload an image.');
}

const formData=new FormData();
formData.append('image',image);
formData.append('role',role);
formData.append('id',id);
formData.append('payment',payment);
formData.append('password',password);
formData.append('amount',amount);
 formData.append('staffName',staffName);
formData.append('email', email);

 if(!image){
  return alert('Image is required');
}

try {
  const response=await axios.post('https://adminpanel-8j8g.onrender.com/authority/regist', formData,
    {headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}}
  )

  if(response.data.message=='successful'){
   navigate('/');
   alert('Staff added successfully');
  }
}
 catch (error) {
  console.error('Error adding staff:', error.message);
}


  }
  return (
    <div className='addProduct'>
      
        <div className='product-nav-bar'>
        <h1><BriefcaseIcon  className='inline w-6 h-6'/>Add New Staff  </h1>
       <div className='product-right-bar'>
        <h4 className='draft'><NewspaperIcon className='inline w-6 h-6'/> save Draf</h4>
        <button onClick={handleSubmit} className='addproduct-button'><CheckIcon className='inline w-6 h-6'/>Add Staff</button> 
        </div>
        </div>
        <div className='product-grouping'>
        <div className='general-info'>
      <b>  <h3>General Information</h3></b>
        <form >
<label> your full name</label>
<input type="text" onChange={(e)=>setStaffName(e.target.value)
}/>
     <label>Role To Be Taken</label>
<input type="text" onChange={(e)=>{setRole(e.target.value)}}/>
<b><h3 className='products-sub-title'>Unique Details</h3></b>
<div className='pricing'>
  <section>
    <label >Identification</label>
  <input type="text" onChange={(e)=>{setId(e.target.value)}}/>
    <label>payment Number(mpesa)</label>
<input type="tel" onChange={(e)=>{setPayment(e.target.value)}}/>
  </section>
  <section>
    <label>personal password</label>
<input type="text" onChange={(e)=>{setPassword(e.target.value)}}/>
<label>Amount To Be Paid</label>
<input type="number" onChange={(e)=>{setAmount(e.target.value)}}/>

  </section>
</div>
        </form>

     
      </div>
      <div className='product-uploads'>
        
        <form >
          <b>  <h3>Upload passPort</h3></b>
 
          <input type="file" title='500px * 500px' onChange={(e)=>{setImage(e.target.files[0])}} />
          <label>enter your email</label>
          <input type="text"  onChange={(e)=>{setEmail(e.target.value)}} />
        </form>
            
      </div>
      </div>
    </div>
  )
}

export default Addstaff
