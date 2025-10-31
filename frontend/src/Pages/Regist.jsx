import React from 'react'
import { useState } from 'react'
 import axios from 'axios'
import { useNavigate } from 'react-router-dom';

  


 const Regist = () => {
const [ID,setID] =useState('');
  const [name,setName]=useState('');
  const [role,setRole]=useState('');
  const [email,setemail]=useState('');
  const [pCode,setpCode]=useState('');
 const navigate=useNavigate();
  const handleTest= (e) => {
    
      e.preventDefault();
const url="https://adminpanel-8j8g.onrender.com/authority/regist";

  // You can now send the name and email via axios to your server
  if(ID!=''&& email!=''&& name!='' && role!=''&& pCode!=''){

    const formData = {
      ID:ID,
      email:email,
      Name:name,
      Role:role,
      passWord:pCode
    };
  
 
   axios.post(url, formData)
    .then(response =>{ 
  navigate('/');
    })
    .catch(error => alert(error));
  }
  else{
    alert('please fill all the inputs provided');
  }

    };
  
    
  


  return (
    <>
    <div className="form">

    <form onSubmit={handleTest} >

   National Id:<input type="number" onChange={(e)=>setID( e.target.value)} /><br />
  Name:  <input type="text" onChange={(e)=>setName( e.target.value)}/><br />
Role:<input type="text" onChange={(e)=>setRole( e.target.value)} placeholder='(admin,manager,seller)'/><br />
Email : <input type="email" onChange={(e)=>setemail(e.target.value)}/><br />
 Password: <input type="password" onChange={(e)=>setpCode(e.target.value)}/><br />
  <input   type="submit"  value='Register' />
    </form>
    </div>
    </>
  )
}

export default Regist
