import React from 'react'
import Header   from   '../navigation/Header'
 import Footer from '../navigation/Footer'
 import {Outlet} from  'react-router-dom'

 import '../styling/pages.css'
const Body = () => {
  return (
    <div className='body'>
      <Header />
      <Outlet />
      <Footer/>
    </div>
  )
}

export default Body
