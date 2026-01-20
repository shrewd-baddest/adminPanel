import React from 'react'
import {BriefcaseIcon, NewspaperIcon,CheckIcon} from '@heroicons/react/24/outline'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Products = () => {
  const navigate=useNavigate();
  const  [category,setCategory]=useState([]);
  const [productName,setProductName]=useState('');
  const [price,setPrice]=useState(0);
  const [stock,setStock]=useState(0);
  const [categoryId,setCategoryId]=useState(0);
  const [description,setDescription]=useState('');
  const [weight,setWeight]=useState(0);
  const [image,setImage]=useState(null);
  const [indx,setIndx]=useState(0);
  const [discount,setDiscount]=useState(0);
  const [supplierId,setSupplierId]=useState('');
  const token = localStorage.getItem('token');
  useEffect(()=>{
const fetchCategory=async()=>{
  const res=await fetch('https://adminpanel-8j8g.onrender.com/pages/category',{headers:{Authorization: `Bearer ${token}`}})
  setCategory(await res.json());
}
  fetchCategory()
},[token]);
console.log(category);
  const handleCategory=(idx)=>{
    setIndx(idx);
    setCategoryId(idx);
  }
  const handleSubmit=async()=>{
const fields=[image,weight,categoryId,stock,price,productName,supplierId];
 
if(fields.some(item=>{item.trim=='' || item==0 || item==null})){
  alert('fill all the fields');
  return; 
}
const formData=new FormData;
formData.append('image',image);
formData.append('weight',weight);
formData.append('description',description);
formData.append('categoryId',categoryId);
formData.append('stock',stock);
formData.append('price',price);
formData.append('productName',productName);
formData.append('supplierId',supplierId);
if(!image){
  return alert('Image is required');
}
 try {
  const response=await axios.post('https://adminpanel-8j8g.onrender.com/pages/supplierItems', formData,
    {headers:{Authorization: `Bearer ${token}`}}
  )

  if(response.data.message=='successfull'){
    alert('product added successfully');
    navigate('/dashboard/inventory');
  }
}
 catch (error) {
  console.error('Error adding product:', error.message);
}


  }
  return (
    <div className='addProduct'>
      
        <div className='product-nav-bar'>
        <h1><BriefcaseIcon  className='inline w-6 h-6'/>Add New Product  </h1>
       <div className='product-right-bar'>
        <h4 className='draft'><NewspaperIcon className='inline w-6 h-6'/> save Draf</h4>
        <button onClick={handleSubmit} className='addproduct-button'><CheckIcon className='inline w-6 h-6'/>Add Product</button> 
        </div>
        </div>
        <div className='product-grouping'>
        <div className='general-info'>
      <b>  <h3>General Information</h3></b>
        <form >
<label> Name Product</label>
<input type="text" onChange={(e)=>setProductName(e.target.value)
}/>
<label >Description Product (optional)</label>
<textarea name="description" id="" cols="40" rows="4" onChange={(e)=>{setDescription(e.value)}}></textarea>
<b><h3 className='products-sub-title'>Pricing And Stock</h3></b>
<div className='pricing'>
  <section>
    <label >Base Pricing</label>
  <input type="text" onChange={(e)=>{setPrice(e.target.value)}}/>
    <label>Discount</label>
<input type="number" onChange={(e)=>{setDiscount(e.target.value)}}/>
  </section>
  <section>
    <label>Stock</label>
<input type="text" onChange={(e)=>{setStock(e.target.value)}}/>
<label>weight</label>
<input type="number" onChange={(e)=>{setWeight(e.target.value)}}/>

  </section>
</div>
        </form>

     
      </div>
      <div className='product-uploads'>
        
        <form >
          <b>  <h3>Upload Img</h3></b>
 
          <input type="file"title='500px*500px' onChange={(e)=>{setImage(e.target.files[0])}} size='500px * 500px'/>
          <label>supplier Id</label>
          <input type="text"  onChange={(e)=>{setSupplierId(e.target.value)}} />
        </form>
               <b> <p>Add Category</p></b>
{
  category.map(item=>
    <div key={item.category_id} >
<p onClick={()=>handleCategory(item.category_id)} 
style={{backgroundColor:indx==item.category_id?'#383434':'#00ffff'}}
className='p-2 border-b-2 border-gray-300 rounded-md hover:cursor-pointer mt-10px'
>{item.category_name}  </p>
    </div>
  )
 
}
      </div>
      </div>
    </div>
  )
}

export default Products
