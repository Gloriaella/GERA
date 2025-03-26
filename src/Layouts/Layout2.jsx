import React from 'react'
import Header2 from './Header2'
import { Outlet } from 'react-router-dom'
import Dashboard from './Dashboard'
import { useState} from 'react'


const Layout2 = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar starts closed

  return (
    <div className="flex">
      {/* Sidebar - Only shows when isSidebarOpen is true */}
      <div className={`fixed lg:relative z-40 transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-0 lg:w-64"} overflow-hidden`}>
        <Dashboard />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-h-screen transition-all duration-300">
        {/* Navbar */}
        <Header2 isSidebarOpen={isSidebarOpen} onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* Page Content */}
        <div className="p-4 mt-16">
          <Outlet />
        </div>
      </div>
    </div>
  );
};




export default Layout2
