import React from 'react'
import Navbar2 from '../Components/Navbar2'

const Header2 = ({ isSidebarOpen, onMenuClick }) => {
  return (
    <div>
      <Navbar2  isSidebarOpen={isSidebarOpen} onMenuClick={onMenuClick} />
    </div>
  )
}

export default Header2
