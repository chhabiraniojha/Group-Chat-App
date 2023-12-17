import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import '../MyStyle.css'
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MessageOthers from '../messageOthers/MessageOthers';
import MessageSelf from '../messageSelf/MessageSelf';
import { AnimatePresence, motion } from 'framer-motion';
import { jwtDecode } from "jwt-decode";
import { useParams } from 'react-router-dom';
import io from "socket.io-client"

const ENDPOINT="http://localhost:3000";
var socket,selectedChatCompare;
function ChatArea() {
    // const [groupId,setGroupId]=useState(null);
    const chatAreaRef = useRef(null);
    const groupData = useParams();
    let currentGroup = JSON.parse(groupData.group);

    // console.log(currentGroup.id)
    const [message, setMessage] = useState("");
    const [messageArea, setMessageArea] = useState([]);
    const [currentUser,setCurrentUser]=useState({id:localStorage.getItem("token")});
    const [socketConnected,setSocketConnected]=useState(false);
    
    async function hendleSendMessage(e) {
        try {
            const token = localStorage.getItem("token")
            const response = await axios.post(`http://localhost:3000/chat`, { message, groupId: currentGroup.id }, { headers: { Authorization: token } })
            // console.log(response)
            if (response.status == 200) {
                setMessage("")
            }
            socket.emit("new message",response,currentGroup.id)
        } catch (error) {
            console.log(error)
        }
    }


    var token = localStorage.getItem("token"); // jwt token;
    var decoded = jwtDecode(token);
    async function getMessages() {
        let localMessages = (JSON.parse(localStorage.getItem(`message_${currentGroup.id}`)))
        console.log(`message_${currentGroup.id}`)
        let lastId = undefined;
        if (localMessages == null) {
            localMessages = [];
        } else if (localMessages.length != 0) {
            lastId = localMessages[localMessages.length - 1].id;
        }
        console.log(currentGroup.id)
        console.log(lastId)


        const response = await axios.get(`http://localhost:3000/chat/${lastId}/${currentGroup.id}`);
        if (response.status == 200) {
            const storageMessages = response.data;
            // console.log(storageMessages)
            const mergeMessage = localMessages.concat(storageMessages)
            let trimmedToTenMessage = []
            if (mergeMessage.length > 10) {

                trimmedToTenMessage = mergeMessage.splice(0, mergeMessage.length - 10)
            } else {
                trimmedToTenMessage = mergeMessage
            }
            // console.log(mergeMessage)
            localStorage.setItem(`message_${currentGroup.id}`, JSON.stringify(trimmedToTenMessage))
            setMessageArea(mergeMessage)
            socket.emit("join chat",currentGroup.id)
            // console.log(messageArea)
            // console.log(messageArea)


        } else {
            setMessageArea([]);
        }



    }
    const getCurrentUser=async ()=>{
         const response=await axios.get('http://localhost:3000/users/currentuser',{ headers: { Authorization: token } });
         setCurrentUser(response.data)
    }
   

    useEffect(()=>{
        console.log(currentUser)
        socket=io(ENDPOINT);
        socket.emit("setup",currentUser);
        socket.on("connection",()=>setSocketConnected(true));

    },[]);


    useEffect(()=>{
        socket.on('receive-message',(newMessage)=>{
            setMessageArea([...messageArea, newMessage]);
            console.log(messageArea)
        })
    })

    useEffect(() => {
        // const intervalId = setInterval(getMessages, 500);

        // // Clear the interval when the component is unmounted
        // return () => {
        //     clearInterval(intervalId);
        // };
        //  setInterval(() =>getMessages(), 1000);
        
        getMessages()
    },[groupData])
    useEffect(() => {
        // Scroll to the bottom when a new message arrives
        if (chatAreaRef.current) {
          chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
        }
      }, [messageArea]);
    

    const scrollToBottom = () => {
        if (chatAreaRef.current) {
            chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
        }
    };
    
   
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
                    <div className='con-icon'>{currentGroup.groupName[0].toUpperCase()}</div>
                    <div className='con-title'>{currentGroup.groupName}</div>
                    <div className='con-lastmessage'>online</div>
                    <div className='con-deleteicon'>
                        <IconButton>
                            <DeleteIcon />
                        </IconButton>
                    </div>
                </div>
                <div className='messages-container' ref={chatAreaRef}>
                    {messageArea.map((message) => {
                        if (message.userId == decoded.userId) {
                            return <MessageSelf message={message} />

                        } else {
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
