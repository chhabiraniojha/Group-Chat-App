import React from 'react'
import '../MyStyle.css'
import { useNavigate } from 'react-router-dom'
function ConversationItem({props}) {
 
    const navigate=useNavigate();
    return (
        <div onClick={()=>navigate('chat')} class="conversation-container">
            <div class="con-icon">R</div>
            <div class="con-title">{props.title}</div>
            <div class="con-lastmessage">{props.lastMessage}</div>
            <div class="con-lastseen">{props.lastSeen}</div>
        </div>
    )
}

export default ConversationItem
