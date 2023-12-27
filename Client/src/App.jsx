import { useEffect, useState } from 'react'
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
import axios from 'axios'
import { useNavigate,Navigate} from 'react-router-dom'
function App() {
  const [user, setUser] = useState(false)
  const navigate=useNavigate()
  async function getUser() {
    const token = localStorage.getItem("token")
    if(token){
      try {
      
        const response = await axios.get("http://localhost:3000/users/currentuser",
          {
            headers: {
              Authorization: token,
            }
          })
        if(response.status==200){
          setUser(true)
        }
      } catch (error) {
          setUser(false)
          // navigate("/")
      }
    }else{
      // navigate("/")
    }
   
  }

  useEffect(()=>{
    getUser()
    console.log(user)
  },[])

  return (

    <div className='App'>
      <Routes>
        <Route path='/' element={<LoginSignup />} >
          <Route path='' element={!user?<Login set={setUser}/>:<Navigate to="/app/chat" />} />
          <Route path='signup' element={!user?<Signup />:<Navigate to="/app/chat" />} />
        </Route>
        <Route path='app' element={user?<MainContainer set={setUser} />:<Navigate to="/" />} >

          <Route path='chat/:group' element={user?<ChatArea />:<Navigate to="/" />} />
          {/* <Route path='chat/' element={<ChatArea />} /> */}
          <Route path='chat' element={user?<WelcomePage />:<Navigate to="/" />} />
          {/* <Route path='users' element={<Users />} />
          <Route path='groups' element={<Groups />} /> */}
          <Route path='creategroups' element={user?<CreateGroup />:<Navigate to="/" />} />
        </Route>
      </Routes>
      {/* <MainContainer />  */}
      {/* <LoginSignup /> */}
    </div>

  )
}

export default App
