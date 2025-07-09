import React, { Suspense, lazy } from 'react';
 
 import { createBrowserRouter, createRoutesFromElements, Route,RouterProvider } from 'react-router-dom'
  import  { most_sold } from './Pages/Home.jsx'
 const Home = lazy(() => import('./Pages/Home.jsx'));
const Login = lazy(() => import('./Pages/Login.jsx'));
const Regist = lazy(() => import('./Pages/Regist.jsx'));
const Body = lazy(() => import('./Layout/Body.jsx'));
const Account = lazy(() => import('./Layout/Account.jsx'));
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
 