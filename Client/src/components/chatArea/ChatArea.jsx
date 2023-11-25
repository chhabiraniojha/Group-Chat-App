import React from 'react'
import '../MyStyle.css'
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MessageOthers from '../messageOthers/MessageOthers';
import MessageSelf from '../messageSelf/MessageSelf';
function ChatArea() {
    return (
        <div className='chatarea-container'>
            <div className='chatarea-header'>
                <div className='con-icon'>I</div>
                <div className='con-title'>Test1</div>
                <div className='con-lastmessage'>online</div>
                <div className='con-deleteicon'>
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </div>
            </div>
            <div className='messages-container'>
                <MessageOthers />
                <MessageSelf />
                <MessageOthers />
                <MessageSelf />
                <MessageOthers />
                <MessageSelf />
                <MessageOthers />
                <MessageSelf />
                <MessageOthers />
                <MessageSelf />
                <MessageOthers />
                <MessageSelf />
            </div>
            <div className='text-input-area'>
                <input placeholder='type a message' className='search-box' />
                <IconButton>
                    <SendIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default ChatArea
