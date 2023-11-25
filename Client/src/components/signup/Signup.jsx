import React from 'react'
import '../MyStyle.css'
import { Button, TextField } from '@mui/material';

function Signup() {
    return (
            <div className='login-container'>
                <p style={{ fontSize: '25px', marginBottom: '15px' }}>Signup for an Account</p>
                <TextField id="name" label="Enter Your Name" type='text' variant="outlined" />
                <TextField id="email" label="Enter Your email" type='email' variant="outlined" />
                <TextField id="Password" label="Password" type='password' variant="outlined" />
                <Button variant="contained" color='success'>Signup</Button>
            </div>
    )
}

export default Signup
