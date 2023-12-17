import React from 'react'
import '../MyStyle.css'
import { useNavigate } from 'react-router-dom'
function ConversationItem({props}) {
    // console.log(proName
    const navigate=useNavigate();
    return (
        <div onClick={()=>navigate(`chat/${JSON.stringify(props)}`)} class="conversation-container">
            <div className="con-icon">{props.groupName[0].toUpperCase()}</div>
            <div className="con-title">{props.groupName}</div>
            {/* <div class="con-lastmessage">{props.lastMessage}</div>
            <div class="con-lastseen">{props.lastSeen}</div> */}
        </div>
    )
}

export default ConversationItem
