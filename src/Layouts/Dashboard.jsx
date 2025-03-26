import React from 'react'
import Sidebar from '../Components/Sidebar'
import Header2 from './Header2'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex">
    {/* Sidebar (Dashboard) */}
    <div className={`fixed lg:relative z-40 h-full transition-all duration-300
      ${isSidebarOpen ? "w-64" : "w-0 lg:w-64"} bg-white shadow-lg overflow-hidden`}>
      <Sidebar />
    </div>

    {/* Main Content */}
    <div className="flex-1 flex flex-col min-h-screen transition-all duration-300">
      {/* Header (Navbar) */}
      <Header2 isSidebarOpen={isSidebarOpen} onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Page Content */}
      <div className="p-4 mt-16">
        <Outlet />
      </div>
    </div>
  </div>
);

}

export default Dashboard
