import React from 'react'
import '../MyStyle.css'

function MessageSelf({message}) {
  
  return (
    <div className='self-message-container'>
      <div className='self-message'>
                <div >{message.message}</div>
                <div className='message-time'>12:52</div>
            </div>
    </div>
  )
}

export default MessageSelf
