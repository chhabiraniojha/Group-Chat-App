import React from 'react'
import '../MyStyle.css'
import Sidebar from '../sidebar/Sidebar'
// import WorkArea from '../workArea/WorkArea'
// import ChatArea from '../chatArea/ChatArea'
// import WelcomePage from '../welcomePage/WelcomePage'
// import CreateGroup from '../createGroup/CreateGroup'
// import Users from '../userGroups/Users'
import { Outlet } from 'react-router-dom'

function MainContainer() {
  return (
    <div className='main-container'>
      <Sidebar />
      <Outlet />
      {/* <User_Groups /> */}
      {/* <CreateGroup /> */}
      {/* <ChatArea /> */}
      {/* <WorkArea /> */}
    </div>
  )
}

export default MainContainer
