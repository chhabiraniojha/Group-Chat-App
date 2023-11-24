import React from 'react'
import '../MyStyle.css'
import logo from '../../images/chatLogo.png'

function WelcomePage() {
  return (
    <div className='welcome-page-container'>
      <img className='welcomepage-logo' src={logo} alt='logo' />
      <p>View and text directly to people present in the chat room</p>
    </div>
  )
}

export default WelcomePage
