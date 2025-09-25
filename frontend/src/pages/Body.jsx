import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'

const Body = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex flex-col sm:flex-row flex-1">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Body
