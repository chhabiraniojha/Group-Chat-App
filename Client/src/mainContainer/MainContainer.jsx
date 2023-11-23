import React from 'react'
import '../MyStyle.css'
import Sidebar from '../sidebar/Sidebar'
import WorkArea from '../workArea/WorkArea'

function MainContainer() {
  return (
    <div className='main-container'>
      <Sidebar />
      <WorkArea />
    </div>
  )
}

export default MainContainer
