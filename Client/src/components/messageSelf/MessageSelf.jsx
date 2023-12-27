import React from 'react'
import '../MyStyle.css'

function MessageSelf({message}) {
  console.log(`message:${message.message}`)
  const fileExtension = message.message.split('.').pop().toLowerCase();
  console.log('File Extension:', fileExtension);
  return (
    <div className='self-message-container'>
      <div className='self-message'>

                {fileExtension==="png"||fileExtension=="jpg"?
                  <div ><img style={{width:"200px",height:"200px"}} src={message.message}></img></div>:
                  <div >{message.message}</div>
                }
                
                <div className='message-time'>12:52</div>
            </div>
    </div>
  )
}

export default MessageSelf
