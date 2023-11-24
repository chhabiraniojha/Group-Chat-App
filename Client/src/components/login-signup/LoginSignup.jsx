import React from 'react'
import '../MyStyle.css'
import SidebarLS from '../sidebarlogsign/SidebarLS'
import Login from '../login/Login'

function LoginSignup() {
  return (
    <div className='login-signup-container'>
      <SidebarLS />
      <Login />
    </div>
  )
}

export default LoginSignup
