import React from 'react'
import { ChatHeader, MessageContainer, MessageSend } from "./index.js"
import { useSelector } from 'react-redux';

const Chatbox = () => {

  const currentChatUser = useSelector((state) => state.chat.currChatUser);

  return currentChatUser ? <><div className='text-white font-raleway relative
  '>
    <ChatHeader />
    <MessageContainer />
    <MessageSend />
  </div></> : <h1 className='flex justify-center items-center text-white text-4xl'>Select a user to chat !</h1>

  // return (
  //   <div className='text-white font-raleway relative
  //   '>
  //     <ChatHeader />
  //     <MessageContainer />
  //     <MessageSend />
  //   </div>
  // )
}

export default Chatbox
