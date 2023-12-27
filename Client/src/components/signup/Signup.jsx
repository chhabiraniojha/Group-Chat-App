import React, { useState } from 'react'
import '../MyStyle.css'
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [phoneNo,setPhoneNo]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();

    const handleSignup=async(e)=>{
        const userDetailsForSignup={
            name,
            email,
            phone:phoneNo,
            password
        }
        try {
            const response=await axios.post(`http://localhost:3000/users/signup`,userDetailsForSignup);
            if(response.status==200){
                alert("signup successfull")
                setName("")
                setEmail("")
                setPhoneNo("")
                setPassword("")
                navigate("/")
            }else if(response.status==203){
                alert("user already exists")
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
            <div className='login-container'>
                <p style={{ fontSize: '25px', marginBottom: '15px' }}>Signup for an Account</p>
                <TextField id="name" value={name} onChange={(e)=>setName(e.target.value)}  label="Enter Your Name" type='text' variant="outlined" />
                <TextField id="email" value={email} onChange={(e)=>setEmail(e.target.value)} label="Enter Your email" type='email' variant="outlined" />
                <TextField id="phone" value={phoneNo} onChange={(e)=>setPhoneNo(e.target.value)} label="Enter Your Phone Number" type='text' variant="outlined" />
                <TextField id="Password" value={password} onChange={(e)=>setPassword(e.target.value)} label="Password" type='password' variant="outlined" />
                <Button onClick={handleSignup} variant="contained" color='success'>Signup</Button>
            </div>
    )
}

export default Signup
