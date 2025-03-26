import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from "./Footer"
const Layout1 = () => {
  return (
    <div>
      <Header/>
      <div>
        <Outlet/>
      </div>
      <Footer/>
    </div>
  )
}

export default Layout1
