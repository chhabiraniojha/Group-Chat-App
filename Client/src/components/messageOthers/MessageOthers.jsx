import React from 'react'
import '../MyStyle.css'

function MessageOthers({message}) {
    // console.log(message)
    return (
        <div className='other-message-container'>
            <div className='con-icon'>A</div>
            <div className='other-message'>
                <div >{message.message}</div>
                <div className='message-time'>12:52</div>
            </div>
        </div>
    )
}

export default MessageOthers
