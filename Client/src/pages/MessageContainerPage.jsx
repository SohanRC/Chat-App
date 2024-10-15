import React from 'react'
import { MessageContainer, ChatHeader, MessageSend } from "../components/index.js"
import { useSelector } from 'react-redux'
import ContactsPage from './ContactsPage.jsx';
import { Navigate } from 'react-router-dom';

const MessageContainerPage = () => {

    const currentChatUser = useSelector((state) => state.chat.currChatUser);

    if (!currentChatUser) return <Navigate to={'/contacts'} />

    return (
        <div className='bg-slate-900 min-h-screen w-screen overflow-hidden text-white'>
            <ChatHeader />
            <MessageContainer />
            <MessageSend />
        </div>
    )
}

export default MessageContainerPage
