import React from 'react'
import '../MyStyle.css'
import SidebarLS from '../sidebarlogsign/SidebarLS'
import Login from '../login/Login'
import { Outlet } from 'react-router-dom'

function LoginSignup() {
  return (
    <div className='login-signup-container'>
      <SidebarLS />
      <Outlet />
    </div>
  )
}

export default LoginSignup
