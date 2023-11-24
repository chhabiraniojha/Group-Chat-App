import React from 'react'
import '../MyStyle.css'
import { Button, TextField } from '@mui/material';

function Login() {
  return (
    <div className='login-container'>
      <p style={{fontSize:'25px',marginBottom:'15px'}}>Login to your Account</p>
      <TextField id="email" label="Enter Your email" type='email' variant="outlined" />
      <TextField id="Password" label="Password" type='password' variant="outlined" />
      <Button variant="contained" color='success'>Login</Button>
    </div>
  )
}

export default Login
