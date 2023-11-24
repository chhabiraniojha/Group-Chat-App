import React, { useState } from 'react'
import '../MyStyle.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NightlightIcon from '@mui/icons-material/Nightlight';
import SearchIcon from '@mui/icons-material/Search';
import ConversationItem from '../conversationItem/ConversationItem';

function Sidebar() {
    const [conversations,setConversation]=useState([
        {
            title:'Test1',
            // lastMessage:"how are you today and hows going all how are you today and hows going all",
            lastSeen:"today"
        },
        {
            title:"Test1",
            lastMessage:"how are you today and hows going all how are you today and hows going all",
            lastSeen:"today"
        },
        {
            title:"Test1",
            lastMessage:"how are you today and hows going all how are you today and hows going all",
            lastSeen:"today"
        },
        {
            title:'Test1',
            // lastMessage:"how are you today and hows going all how are you today and hows going all",
            lastSeen:"today"
        },
        {
            title:"Test1",
            lastMessage:"how are you today and hows going all how are you today and hows going all",
            lastSeen:"today"
        },
        {
            title:'Test1',
            // lastMessage:"how are you today and hows going all how are you today and hows going all",
            lastSeen:"today"
        },
        {
            title:"Test1",
            lastMessage:"how are you today and hows going all how are you today and hows going all",
            lastSeen:"today"
        },
        {
            title:"Test1",
            lastMessage:"how are you today and hows going all how are you today and hows going all",
            lastSeen:"today"
        },
        {
            title:'Test1',
            // lastMessage:"how are you today and hows going all how are you today and hows going all",
            lastSeen:"today"
        },
        {
            title:"Test1",
            lastMessage:"how are you today and hows going all how are you today and hows going all",
            lastSeen:"today"
        }
    ])
    return (
        <div className='sidebar-container'>
            <div className='sb-header'>
                <div>
                    <IconButton>
                        <AccountCircleIcon />
                    </IconButton>
                </div>
                <div>
                    <IconButton>
                        <PersonAddIcon />
                    </IconButton>
                    <IconButton>
                        <GroupAddIcon />
                    </IconButton>
                    <IconButton>
                        <AddCircleIcon />
                    </IconButton>
                    <IconButton>
                        <NightlightIcon />
                    </IconButton>
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
