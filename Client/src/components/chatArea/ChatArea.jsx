import React, { useEffect, useState } from 'react'
import '../MyStyle.css'
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MessageOthers from '../messageOthers/MessageOthers';
import MessageSelf from '../messageSelf/MessageSelf';
import { AnimatePresence, motion } from 'framer-motion';
import { jwtDecode } from "jwt-decode";
function ChatArea() {
    const [message, setMessage] = useState("");
    const [messageArea,setMessageArea]=useState([]);
    async function hendleSendMessage(e) {
        try {
            const token = localStorage.getItem("token")
            const response = await axios.post(`http://localhost:3000/chat`, { message }, { headers: { Authorization: token } })
            if (response.status == 200) {
                setMessage("")
            }
        } catch (error) {
            console.log(error)
        }
    }


    var token = localStorage.getItem("token"); // jwt token;
    var decoded = jwtDecode(token);
    console.log(decoded.userId);
    async function getMessages(){
        const localMessages=(JSON.parse(localStorage.getItem("message")))
        let lastId=undefined;
        if(localMessages.length!=0){
            lastId=localMessages[localMessages.length-1].id;
        }
        const response=await axios.get(`http://localhost:3000/chat/${lastId}`);
        const storageMessages=response.data;
        console.log(storageMessages)
        const mergeMessage=localMessages.concat(storageMessages)
        const trimmedToTenMessage=mergeMessage.splice(0,mergeMessage.length-10)
        console.log(mergeMessage)
        setMessageArea(mergeMessage)
        localStorage.setItem("message",JSON.stringify(messageArea))
        console.log(JSON.parse(localStorage.getItem("message")))
    }

    useEffect(()=>{
        setInterval(() =>getMessages(), 1000);
        
    },[])
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
                  {messageArea.map((message)=>{
                      if(message.userId==decoded.userId){
                        return <MessageSelf message={message}  />
                        
                      }else{
                       return <MessageOthers message={message} />
                      }
                  })}
                    
                </div>
                <div className='text-input-area'>
                    <input placeholder='type a message' type='text' value={message} onChange={(e) => setMessage(e.target.value)} className='search-box' />
                    <IconButton onClick={hendleSendMessage}>
                        <SendIcon />
                    </IconButton>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

export default ChatArea
