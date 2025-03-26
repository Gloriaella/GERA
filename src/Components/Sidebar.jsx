import React from 'react'
import { NavLink } from "react-router-dom";
import { FiGrid, FiClipboard, FiBarChart2, FiSettings, FiBell, FiHome } from "react-icons/fi"
const Sidebar = () => {
  return (
    <aside className="w-64 bg-white text-orange-600 p-4 h-screen fixed top-16 pt-4 z-20 left-0 shadow-2xl">
    {/* <h2 className="text-xl font-bold mb-4">Dashboard</h */}
    <nav className='text-sm'>
      <ul className="space-y-2">
      <li>
          <NavLink 
           to={"/dashboard"}
           end
          className={({ isActive, isPending }) =>
            ` flex items-center p-2 hover:bg-orange-600 hover:text-white rounded-full  ${
              isPending
                ? " text-orange-600"
                : isActive
                ? "bg-orange-600 text-white rounded-full "
                : "text-orange-600"
            }`
          }
        >
        
            <FiHome className="mr-2" /> Home{""}
          </NavLink>
       </li>
        <li>
          <NavLink 
           to={"/dashboard/boards"}
          className={({ isActive, isPending }) =>
            ` flex items-center p-2 hover:bg-orange-600 hover:text-white rounded-full  ${
              isPending
                ? " text-orange-600"
                : isActive
                ? "bg-orange-600 text-white rounded-full "
                : "text-orange-600"
            }`
          }
        >
        
            <FiGrid className="mr-2" /> Boards{""}
          </NavLink>
        </li>
       
        <li>
          <NavLink  
          to={"/dashboard/analytics"}
          className={({ isActive, isPending }) =>
            ` flex items-center p-2 hover:bg-orange-600 hover:text-white rounded-full  ${
              isPending
                ? " text-orange-600"
                : isActive
                ? "bg-orange-600 text-white rounded-full "
                : "text-orange-600"
            }`
          }>
            <FiBarChart2 className="mr-2" /> Analytics{""}
          </NavLink>
        </li>
        <li>
          <NavLink 
           to={"/dashboard/workflows"}
          className={({ isActive, isPending }) =>
            ` flex items-center p-2 hover:bg-orange-600 hover:text-white rounded-full  ${
              isPending
                ? " text-orange-600"
                : isActive
                ? "bg-orange-600 text-white rounded-full "
                : "text-orange-600"
            }`
          }>
            <FiClipboard className="mr-2" /> Workflows{""}
          </NavLink>
        </li>
        <li>
          <NavLink 
           to={"/dashboard/notifications"}
          className={({ isActive, isPending }) =>
            ` flex items-center p-2 hover:bg-orange-600 hover:text-white rounded-full  ${
              isPending
                ? " text-orange-600"
                : isActive
                ? "bg-orange-600 text-white rounded-full "
                : "text-orange-600"
            }`
          }>
            <FiBell className="mr-2" /> Notifications{""}
          </NavLink>
        </li>
        <li>
          <NavLink  
          to={"/dashboard/newsletter"}
          className={({ isActive, isPending }) =>
            ` flex items-center p-2 hover:bg-orange-600 hover:text-white rounded-full  ${
              isPending
                ? " text-orange-600"
                : isActive
                ? "bg-orange-600 text-white rounded-full "
                : "text-orange-600"
            }`
          }>
            <FiClipboard className="mr-2" /> NewsLetter{""}
          </NavLink>
        </li>
      </ul>
    </nav>
  </aside>
  )
}

export default Sidebar



 