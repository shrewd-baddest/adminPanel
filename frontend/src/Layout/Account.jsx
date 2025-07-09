import React from 'react'
import { Outlet } from 'react-router-dom'
import '../styling/Body.css'
const Account = () => {
  return (
    <div>
      <Outlet/>
    </div>
  )
}

export default Account
