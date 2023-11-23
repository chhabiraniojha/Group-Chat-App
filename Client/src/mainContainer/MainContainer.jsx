import React from 'react'
import '../MyStyle.css'
import Sidebar from '../sidebar/Sidebar'
import WorkArea from '../workArea/WorkArea'
import ChatArea from '../chatAtra/ChatArea'

function MainContainer() {
  return (
    <div className='main-container'>
      <Sidebar />
      <ChatArea />
      {/* <WorkArea /> */}
    </div>
  )
}

export default MainContainer
