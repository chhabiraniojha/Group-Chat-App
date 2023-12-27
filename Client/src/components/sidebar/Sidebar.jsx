import React, { useEffect, useState } from 'react'
import '../MyStyle.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NightlightIcon from '@mui/icons-material/Nightlight';
import SearchIcon from '@mui/icons-material/Search';
import ConversationItem from '../conversationItem/ConversationItem';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import LogoutIcon from '@mui/icons-material/Logout';

function Sidebar({set}) {
    console.log(set)
    const navigate=useNavigate();
    const [conversations,setConversation]=useState([]);

    const getCoversation=async ()=>{
        try {
            const token=localStorage.getItem("token")
            const response=await axios.get('http://localhost:3000/groups/allgroups',{ headers: { Authorization: token } })
            
            setConversation(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getCoversation();  
    },[])
    // console.log(conversations)
    
    return (
        <div className='sidebar-container'>
            <div className='sb-header'>
                <div>
                    <IconButton>
                        <AccountCircleIcon />
                    </IconButton>
                </div>
                <div>
                    {/* <IconButton onClick={()=>navigate('users')}>
                        <PersonAddIcon />
                    </IconButton>
                    <IconButton onClick={()=>navigate('groups')}>
                        <GroupAddIcon />
                    </IconButton> */}
                    <IconButton onClick={()=>navigate('creategroups')}>
                        <AddCircleIcon />
                    </IconButton>
                    <IconButton onClick={()=>set(false)}>
                        <LogoutIcon />
                    </IconButton>
                    {/* <IconButton>
                        <NightlightIcon />
                    </IconButton> */}
                </div>

            </div>
            <div className='sb-search'>
                <IconButton>
                    <SearchIcon />
                </IconButton>
                <input placeholder='search' className='search-box' />
            </div>
            <div className='sb-conversations'>
                {conversations.map((conversation)=>{
                     return(
                        <ConversationItem  props={conversation} />
                     )
                })}
                
            </div>
        </div>
    )
}

export default Sidebar
