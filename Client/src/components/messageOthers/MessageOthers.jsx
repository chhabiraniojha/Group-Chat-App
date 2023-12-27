import React from 'react'
import '../MyStyle.css'

function MessageOthers({message}) {
    // console.log(message)
    const fileExtension = message.message.split('.').pop().toLowerCase();
    return (
        <div className='other-message-container'>
            <div className='con-icon'>A</div>
            <div className='other-message'>
            {fileExtension==="png"||fileExtension=="jpg"?
                  <div ><img style={{width:"200px",height:"200px"}} src={message.message}></img></div>:
                  <div >{message.message}</div>
                }
                <div className='message-time'>12:52</div>
            </div>
        </div>
    )
}

export default MessageOthers
