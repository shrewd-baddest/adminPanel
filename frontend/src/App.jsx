import React, { Suspense, lazy } from 'react';
 
 import { createBrowserRouter, createRoutesFromElements, Route,RouterProvider } from 'react-router-dom'
  import  { most_sold } from './Pages/Home.jsx'
  import {productsDetails} from './Pages/Inventory.jsx'
  const Home = lazy(() => import('./Pages/Home.jsx'));
const Login = lazy(() => import('./Pages/Login.jsx'));
const Regist = lazy(() => import('./Pages/Regist.jsx'));
const Body = lazy(() => import('./Layout/Body.jsx'));
const Account = lazy(() => import('./Layout/Account.jsx'));
const Inventory=lazy(()=> import('./Pages/Inventory.jsx'));
const Products=lazy(()=>import('./Pages/Products.jsx'));
const Staff=lazy(()=>import('./Pages/Staff.jsx'));
const Addstaff=lazy(()=>import('./Pages/Addstaff.jsx'))
const Sales=lazy(()=>import('./Pages/Sales.jsx'))
const Report=lazy(()=>import('./Pages/Report.jsx'))
const Setting=lazy(()=>import('./Pages/Setting.jsx'))
const LoadingFallback = () => <div className="spinner">⏳ Please wait...</div>;
  const App = () => {
const router=createBrowserRouter(
  createRoutesFromElements(
      <>
    <Route path='/' element={<Account/>}>
    <Route index element={<Login/>}/>
<Route path='/signup' element={<Regist/>} />
    </Route>
   <Route path='/dashboard' element={<Body />} >
  <Route index element={<Home/>} loader={most_sold} />
  <Route path='inventory' element={<Inventory/>} loader={productsDetails}/>
  <Route path='addProduct' element={<Products/>} />
    <Route path='staff' element={<Staff/>} />
   <Route path='addstaff' element={<Addstaff/>} />
   <Route path='sales'  element={<Sales/>} />
   < Route path='reports' element={<Report />}/>
   <Route path='settings' element={<Setting />}/>

     </Route>
   </>
    
  )
);

   return (
     <Suspense fallback={<LoadingFallback/>}>
      <RouterProvider router={router} />
      </Suspense>
   )
   
 }
 
 export default App
 