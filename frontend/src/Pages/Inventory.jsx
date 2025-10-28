import React,{useState,useRef, useEffect} from 'react'
import { Link, useLoaderData, useNavigate, useSearchParams } from 'react-router-dom'
import { MagnifyingGlassIcon, FunnelIcon, HomeIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

const Inventory = () => {
      const token = localStorage.getItem('token');
  const [products,setProducts]=useState([]);
 const details=useLoaderData()
   const blurs=useRef(null);
const deletes=useRef(null);
const [search,setSearch]=useState('');
const [searchProducts,setSearchProducts]=useState([]);
   const[productToDelete,setProductToDelete]=useState(null);
   const [query,setQuery]=useState('')
   const navigate=useNavigate();
     const [activeTab, setActiveTab] = useState(0);    
    const tabNames = ['All', 'Active', 'sold'];
   const [searchParams]=useSearchParams();
   
  const handleTabClick = (index) => {
    setActiveTab(index);
   };
 


  const deleting = (productId) => {
    
   setProductToDelete(productId);
if (blurs.current){
  blurs.current.style.filter='blur(4px)';
  document.body.style.overflow = 'hidden';

    if (deletes.current) {
      deletes.current.style.display = 'block';
      
    }
   

}
  }
  
  const okDelete = async () => {
    try {
      const res = await axios.post(
        'http://localhost:3000/pages/deleteProduct',
        { productId: productToDelete },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res)

      if (res.data.message === 'success') {
        alert('Deleted successfully');
        deletes.current.style.display = 'none';
        blurs.current.style.filter = 'none';
        setProductToDelete(null);
       } else {
        alert('An error occurred while deleting.');
      }
    } catch (error) {
      console.log(error.message);
    }
  };
    const cancelDelete = () => {
    deletes.current.style.display = 'none';
    blurs.current.style.filter = 'none';
    document.body.style.overflow = 'auto';
    setProductToDelete(null);
  };
  const handleSearch=()=>{
if(search!==''){
  navigate(`/dashboard/inventory?q=${encodeURIComponent(search)}`)




 
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
  getSearch()  },[search]
  )
  return (
    <>
    <div className='inventory' ref={blurs}>
      <div className='headings'>
        <h3 className='Htitle'>Products</h3> 
<button onClick={()=>navigate('/dashboard/addProduct')} className='Hbutton'>+Add Products</button> 
   </div>
    
        <section className='overall'>
            {
                products.map((product,index)=>(
                  <div key={index}>
           <h3>{product.title}</h3>
           <h3>{product.value}</h3>
           <h3>Since last Week</h3>
             </div>
                ))
            }
           
            </section>
<section className='inventory_nav'>
      <div className='inventory_nav-left-tab'>
            <h4>Product List</h4>
            <div className='inventory_nav-left-tab-buttons'>
              {tabNames.map((name, idx) => (
                <button
                  key={name}
                  className='tog'
                  style={{
                    backgroundColor: activeTab === idx ? '#000' : ' #00ffff',
                    color: activeTab === idx ? '#fff' : '#000'
                  }}
                  onClick={() => handleTabClick(idx)}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
<div className='inventory_nav-right-tab'>
    <input type='text' placeholder='search' className='inventory_nav-right-tab-search' onChange={(e)=>{setSearch(e.target.value)}}/>
<button type="submit" className="inventory_nav-right-tab-button" onClick={()=>{handleSearch}}>
  <MagnifyingGlassIcon className="inline h-4 w-4" />
</button>

    <p><FunnelIcon className='inline h-4 w-4'/>filter</p>
    </div>
    </section>
   <section className='inventory-list'>
  <div className='inventory-list-headers'>
    <p>Image</p>
    <p className='price'>Price</p>
    <p className='Qty'>Qty</p>
    <p className='weight'>Store</p>
    <p className='Action'>Action</p>
  </div>
  <hr />

  <div>
{
searchProducts.length>0?(

    searchProducts.map((searchProduct, index) => (
        <div className='productDetails' key={index}>
          <img src={searchProduct.image_url} className='image' />
          <p className='price'>{searchProduct.price}</p>
          <p className='Qty'>{searchProduct.stock}</p>
          <p className='weight'>{searchProduct.weight_ml}</p>
          <div className='action'>
            <button>
              <PencilIcon className='inline h-4 w-4' />
            </button>
            <button onClick={() => deleting(searchProduct.products_id)}>
              <TrashIcon className='inline h-4 w-4' />
            </button>
          </div>
          <hr />
        </div>
      ))
     
):(

details.length > 0 ? (
      details.map((detail, index) => (
        <div className='productDetails' key={index}>
          <img src={detail.image_url} className='image' />
          <p className='price'>{detail.price}</p>
          <p className='Qty'>{detail.stock}</p>
          <p className='weight'>{detail.weight_ml}</p>
          <div className='action'>
            <button>
              <PencilIcon className='inline h-4 w-4' />
            </button>
            <button onClick={() => deleting(detail.products_id)}>
              <TrashIcon className='inline h-4 w-4' />
            </button>
          </div>
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
    )

)

}

    
  </div>
</section>

        </div>
<div ref={deletes} className='pay_form'>
        <h4>Are you sure you want to delete this product? </h4>
    <div className='button'>
      <button onClick= {okDelete} className='yes'>YES</button>
      <button onClick={cancelDelete} className='cancel'>Cancel</button>
    </div>
    </div>
</>
            
  )
}

export default Inventory

export const productsDetails=async()=>{
    const token = localStorage.getItem('token');
     try {
 const response=await fetch('http://localhost:3000/pages/productDetails',{
  headers:{
    Authorization:`Bearer ${token} `
  }}
)
const data=await response.json();
    if (!Array.isArray(data)) {
     alert(data.message);
      return [];
    }

    return data;

}     catch (error) {
        throw new Error("error.message");
        
    }
}