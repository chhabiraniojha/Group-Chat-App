import React from 'react'
import '../MyStyle.css'
function ConversationItem({props}) {
 

    return (
        <div class="conversation-container">
            <div class="con-icon">R</div>
            <div class="con-title">{props.title}</div>
            <div class="con-lastmessage">{props.lastMessage}</div>
            <div class="con-lastseen">{props.lastSeen}</div>
        </div>
    )
}

export default ConversationItem
