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
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Modal from 'react-modal';
import CloseIcon from '@mui/icons-material/Close';

const ENDPOINT = "http://localhost:3000";
var socket, selectedChatCompare;
function ChatArea() {
    // const [groupId,setGroupId]=useState(null);
    const chatAreaRef = useRef(null);
    const groupData = useParams();
    let currentGroup = JSON.parse(groupData.group);
    // console.log(currentGroup)

    // console.log(currentGroup)
    const [message, setMessage] = useState("");
    const [messageArea, setMessageArea] = useState([]);
    const [currentUser, setCurrentUser] = useState({ id: localStorage.getItem("token") });
    const [socketConnected, setSocketConnected] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const fileInputRef = useRef(null);


    const handleFileChange = (event) => {
        console.log(event.target)
        const file = event.target.files[0];
        // console.log('Selected File:', file);
        setSelectedFile(file);

        // Display file preview
        if (file) {

            const formData = new FormData();
            formData.append('file', file);
            // console.log('FormData:', formData);
            const reader = new FileReader();
            reader.onloadend = () => {
                setFilePreview(reader.result);
                setIsModalOpen(true); // Open the modal when a file is selected
            };
            reader.readAsDataURL(file);
        } else {
            setFilePreview(null);
            setIsModalOpen(false);
        }
    };
    const handleModalSubmit = async () => {
        try {
            if (selectedFile) {
                // Create FormData
                // console.log(selectedFile.name)
                const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
                // console.log('File Extension:', fileExtension);
                let formData = new FormData();
                formData.append('file', selectedFile);
                const data = formData.get("file")
                // console.log(data)

                const token = localStorage.getItem("token")
                const response = await axios.post(`http://localhost:3000/mediachat?groupData=${JSON.stringify(currentGroup)}&fileExtension=${fileExtension}`, { data },

                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: token,
                        }
                    });
                // console.log(response)
                if (response.status == 200) {
                    // console.log(response.data.chats)
                    setIsModalOpen(false);
                    socket.emit("new message", response, currentGroup.id)
                }

            }
            else {
                alert('Please select a file.');
            }
        } catch (error) {
            console.error('Error uploading file:', error.message);
        }
    };
    const handleModalClose = () => {
        setIsModalOpen(false);
    };
    const handleButtonClick = () => {
        // Trigger click on the hidden file input
        fileInputRef.current.click();
    };

    async function hendleSendMessage(e) {
        if (message == "") {
            return;
        }
        try {
            const token = localStorage.getItem("token")
            // console.log(`mytoken ${token}`)
            // console.log(message)
            const response = await axios.post(`http://localhost:3000/chat`, { message, groupId: currentGroup.id }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                }
            })
            // console.log(response)
            if (response.status == 200) {
                setMessage("")
            }
            socket.emit("new message", response, currentGroup.id)
        } catch (error) {
            // console.log(error)
        }
    }


    var token = localStorage.getItem("token"); // jwt token;
    var decoded = jwtDecode(token);
    async function getMessages() {
        let localMessages = (JSON.parse(localStorage.getItem(`message_${currentGroup.id}`)))
        // console.log(`message_${currentGroup.id}`)
        let lastId = undefined;
        if (localMessages == null) {
            localMessages = [];
        } else if (localMessages.length != 0) {
            lastId = localMessages[localMessages.length - 1].id;
        }
        // console.log(currentGroup.id)
        // console.log(lastId)


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
            socket.emit("join chat", currentGroup.id)
            // console.log(messageArea)
            // console.log(messageArea)


        } else {
            setMessageArea([]);
        }



    }
    const getCurrentUser = async () => {
        const response = await axios.get('http://localhost:3000/users/currentuser', { headers: { Authorization: token } });
        setCurrentUser(response.data)
    }


    useEffect(() => {
        // console.log(currentUser)
        socket = io(ENDPOINT);
        socket.emit("setup", currentUser);
        socket.on("connection", () => setSocketConnected(true));

    }, []);


    useEffect(() => {
        socket.on('receive-message', (newMessage) => {
            setMessageArea([...messageArea, newMessage]);
            // console.log(messageArea)
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
    }, [groupData])
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
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {/* Hidden file input */}
                        <input
                            type="file"
                            id="fileInput"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            // style={{ position: 'absolute', left: '-9999px' }}
                            onChange={handleFileChange}
                        />

                        {/* Attach icon with Material-UI icon */}
                        <label htmlFor="fileInput">
                            <IconButton onClick={handleButtonClick}>
                                <AttachFileIcon />
                            </IconButton>
                        </label>
                        <Modal
                            isOpen={isModalOpen}
                            onRequestClose={() => setIsModalOpen(false)}
                            contentLabel="File Preview Modal"
                            style={{
                                content: {
                                    width: '20%', // Adjust the width as needed
                                    maxHeight: '30vh', // Adjust the max height as needed
                                    top: 'auto', // Set to 'auto' to position at the bottom
                                    bottom: '3rem', // Set to 0 to align with the bottom
                                    left: 0,
                                    margin: 'auto', // Center the modal
                                    marginLeft: "32rem"
                                },
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <IconButton onClick={handleModalClose} style={{ marginLeft: 'auto', padding: '10px' }}>
                                    <CloseIcon />
                                </IconButton>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                {/* File preview */}
                                {filePreview && (
                                    <img
                                        src={filePreview}
                                        alt="File Preview"
                                        style={{
                                            maxWidth: '100%', // Set maximum width
                                            maxHeight: 'calc(30vh - 15vh)', // Set maximum height, considering space for other elements
                                            width: 'auto',
                                            height: 'auto',
                                            marginBottom: '10px',
                                        }}
                                    />
                                )}

                                {/* Button for submitting */}
                                <IconButton
                                    // variant="contained"
                                    // color="primary"
                                    onClick={handleModalSubmit}
                                    style={{ marginTop: '10px' }}
                                >
                                    <SendIcon />
                                </IconButton>
                            </div>
                        </Modal>
                        {/* {filePreview && (
                            <img
                                src={filePreview}
                                alt="File Preview"
                                style={{ maxWidth: '100%', maxHeight: '200px' }}
                            />
                        )} */}
                    </div>
                    <IconButton onClick={hendleSendMessage}>
                        <SendIcon />
                    </IconButton>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

export default ChatArea
