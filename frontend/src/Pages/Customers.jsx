import React,{useLoaderData} from 'react'

const Customers = () => {

    const customers =useLoaderData();
    console.log(customers);
    const allCustomers=customers.allCustomers;
    const newCustomers=customers.newCustomers;
    const activeCustomers=customers.activeCustomers;
    



  return (
    <div>
<div className="grid grid-cols-3 gap-6 mt-6">
  <div className="p-6 text-center bg-white shadow-md rounded-2xl">
    <p className="text-gray-500">Total Customers</p>
    <h2 className="text-3xl font-bold text-blue-600">{allCustomers.length}</h2>
  </div>
  <div className="p-6 text-center bg-white shadow-md rounded-2xl">
    <p className="text-gray-500">New Customers</p>
    <h2 className="text-3xl font-bold text-green-600">{newCustomers.length}</h2>
  </div>
  <div className="p-6 text-center bg-white shadow-md rounded-2xl">
  <p className="text-gray-500">Active Customers</p>
    <h2 className="text-3xl font-bold text-orange-600">{activeCustomers.length}</h2>
  </div>
</div>


<table className="min-w-full border border-gray-200 rounded-lg">
  <thead className="bg-gray-100">
    <tr>
      <th className="px-4 py-2 text-left">ID</th>
      <th className="px-4 py-2 text-left">Name</th>
      <th className="px-4 py-2 text-left">Email</th>
      <th className="px-4 py-2 text-left">Joined</th>
      <th className="px-4 py-2 text-left">Status</th>
    </tr>
  </thead>
  <tbody>
    {customers.map((c) => (
      <tr key={c.ID} className="transition hover:bg-gray-50">
        <td className="px-4 py-2">{c.ID }</td>
        <td className="flex items-center gap-2 px-4 py-2">
           {c.firstname}
        </td>
        <td className="px-4 py-2">{c.email}</td>
        <td className="px-4 py-2">{new Date(c.created_at).toLocaleDateString()}</td>
        <td className="px-4 py-2">
          <span className={`px-2 py-1 rounded-full text-sm ${activeCustomers.includes(c.id) ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
            {activeCustomers.includes(c.id) ? 'Active' : 'Inactive'}
          </span>
        </td>
      </tr>
    ))}
  </tbody>
</table>



    </div>
  )
}

export default Customers


export const customersDetails=async()=>{
 
try {
    const response=await fetch('http://localhost:3000/pages/customersDetails',{
        headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
        }
    });
    const data=await response.json();
    return data;
    
} catch (error) {
    return {error: error.message}
}
 
}