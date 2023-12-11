import React, { useState } from 'react'
import '../MyStyle.css'
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate=useNavigate();
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("")
  const handleSignin=async()=>{
    try {
      const response=await axios.post(`http://localhost:3000/users/signin`,{email,password})
      if(response.status==200){
        alert("success")
        navigate("/app/chat")
      }
    } catch (error) {
      alert("password mismatch")
    }
  }
  return (
    <div className='login-container'>
      <p style={{fontSize:'25px',marginBottom:'15px'}}>Login to your Account</p>
      <TextField id="email" value={email} onChange={(e)=>setEmail(e.target.value)} label="Enter Your email" type='email' variant="outlined" />
      <TextField id="Password" value={password} onChange={(e)=>setPassword(e.target.value)} label="Password" type='password' variant="outlined" />
      <Button variant="contained" color='success' onClick={handleSignin}>Login</Button>
      <p>do not have an account <a>signup</a></p>
      <p>forgot password</p>
    </div>
  )
}

export default Login
