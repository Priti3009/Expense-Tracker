import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

const Body = () => {
  return (
    <>
    <div className='flex min-h-screen'>
        <Sidebar/>
    
    <div className='flex-1 p-6 bg-gray-50'>
        <Outlet/>
    </div>
    </div>
    </>
  )
}

export default Body