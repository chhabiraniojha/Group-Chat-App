import { useState } from 'react'
import './App.css'
import MainContainer from './components/mainContainer/MainContainer'
import LoginSignup from './components/login-signup/LoginSignup'
import { Route, Routes } from 'react-router-dom'
import Login from './components/login/Login'
import Signup from './components/signup/Signup'
import WelcomePage from './components/welcomePage/WelcomePage'
import Users from './components/userGroups/Users'
import CreateGroup from './components/createGroup/CreateGroup'
import ChatArea from './components/chatArea/ChatArea'
import Groups from './components/userGroups/Groups'
function App() {


  return (

    <div className='App'>
      <Routes>
        <Route path='/' element={<LoginSignup />} >
          <Route path='' element={<Login />} />
          <Route path='signup' element={<Signup />} />
        </Route>
        <Route path='app' element={<MainContainer />} >
          <Route path='chat' element={<ChatArea />} />
          <Route path='welcome' element={<WelcomePage />} />
          <Route path='users' element={<Users />} />
          <Route path='groups' element={<Groups />} />
          <Route path='creategroups' element={<CreateGroup />} />
        </Route>
      </Routes>
      {/* <MainContainer />  */}
      {/* <LoginSignup /> */}
    </div>

  )
}

export default App
