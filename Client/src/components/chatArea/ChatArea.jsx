import React, { useState } from 'react'
import '../MyStyle.css'
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MessageOthers from '../messageOthers/MessageOthers';
import MessageSelf from '../messageSelf/MessageSelf';
import { AnimatePresence, motion } from 'framer-motion';
function ChatArea() {
    const [message,setMessage]=useState("")
    async function hendleSendMessage(e){
       try {
          const token=localStorage.getItem("token")
          const response=await axios.post(`http://localhost:3000/chat`,{message},{headers: { Authorization: token } })
          if(response.status==200){
            setMessage("")
          }
       } catch (error) {
         console.log(error)
       }
    }
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{
                    ease: 'anticipate',
                    duration: 0.3
                }}
                className='chatarea-container'>
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
                    <input placeholder='type a message' type='text' value={message} onChange={(e)=>setMessage(e.target.value)} className='search-box' />
                    <IconButton onClick={hendleSendMessage}>
                        <SendIcon />
                    </IconButton>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

export default ChatArea
