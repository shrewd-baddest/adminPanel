import React from 'react'
import {BriefcaseIcon, NewspaperIcon,CheckIcon} from '@heroicons/react/24/outline'
import { useEffect } from 'react'
import { useState } from 'react'
const Products = () => {
  const  [category,setCategory]=useState([]);
  const [productName,setProductName]=useState('');
  const [price,setPrice]=useState(0);
  const [stock,setStock]=useState(0);
  const [categoryId,setCategoryId]=useState(0);
  const [description,setDescription]=useState('');
  const [weight,setWeight]=useState(0);
  const [image,setImage]=useState(null);
  const [indx,setIndx]=useState(0);
  const [supplierId,setSupplierId]=useState('');
  useEffect(()=>{
const fetchCategory=async()=>{
  const res=await fetch('http://localhost:3000/pages/category',{headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}})
  setCategory(await res.json());
}
  fetchCategory()
},[])
  const handleCategory=(idx)=>{
    setIndx(idx);
    setCategoryId(idx);
  }
  const handleSubmit=async()=>{
const fields=[image,weight,description,categoryId,stock,price,productName,supplierId];
if(fields.some(item=>{item.trim=='' || item==0 || item==null})){
  alert('fill all the fields')
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
  const response=await axios.post('http://localhost:3000/pages/supplierItems', formData,
    {headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}}
  )

  if(response.data.message=='successful'){
    alert('product added successfully');
  }
}
 catch (error) {
  console.error('Error adding product:', error.message);
}


  }
  return (
    <div className='addProduct'>
      
        <div className='product-nav-bar'>
        <h1><BriefcaseIcon  className='inline h-6 w-6'/>Add New Product  </h1>
       <div className='product-right-bar'>
        <h4 className='draft'><NewspaperIcon className='inline h-6 w-6'/> save Draf</h4>
        <button onClick={handleSubmit} className='addproduct-button'><CheckIcon className='inline h-6 w-6'/>Add Product</button> 
        </div>
        </div>
        <div className='product-grouping'>
        <div className='general-info'>
      <b>  <h3>General Information</h3></b>
        <form >
<label> Name Product</label>
<input type="text" onChange={(e)=>setProductName(e.target.value)
}/>
<label >Description Product </label>
<textarea name="description" id="" cols="40" rows="4" onChange={(e)=>{setDescription(e.value)}}></textarea>
<b><h3 className='products-sub-title'>Pricing And Stock</h3></b>
<div className='pricing'>
  <section>
    <label >Base Pricing</label>
  <input type="text" onChange={(e)=>{setPrice(e.target.value)}}/>
    <label>Discount</label>
<input type="number" onChange={(e)=>{setWeight(e.target.value)}}/>
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
 
          <input type="file"title='500px*500px' onChange={(e)=>{setImage(e.target.files[0])}} />
          <label>supplier Id</label>
          <input type="text"  onChange={(e)=>{setSupplierId(e.target.value)}} />
        </form>
               <b> <p>Add Category</p></b>
{
  category.map(item=>
    <div key={item.value}>
<p title={item.cat} onClick={()=>handleCategory(item.value)} 
style={{backgroundColor:indx==item.value?'#383434':'#00ffff'}}
>{item.value}</p>
    </div>
  )
}
      </div>
      </div>
    </div>
  )
}

export default Products
