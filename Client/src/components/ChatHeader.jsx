import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentChat } from '../store/slices/chatSlice';
import { useNavigate } from 'react-router-dom';

const ChatHeader = () => {
    const user = useSelector((state) => state.user.userInfo);
    const currentChatUser = useSelector((state) => state.chat.currChatUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const closeChat = () => {
        dispatch(setCurrentChat(null))
        if (window.innerWidth <= "890")
            navigate('/contacts');
    }

    return (
        <div className='p-2 bg-slate-700 font-bold tracking-wide flex justify-between items-center '>
            <div className='flex justify-center items-center gap-2 ml-2'>
                <img src={currentChatUser.imageUrl} alt="Profile Image" className='h-12 w-12 rounded-full ' />
                <h1 className='text-2xl'>{currentChatUser.firstName}</h1>
            </div>
            <div className='mr-2 p-2 cursor-pointer' onClick={closeChat}>
                <CloseIcon sx={{
                    fontSize: "2rem",
                    color: "#33FFFF"
                }} className='hover:bg-slate-900 rounded-full duration-100 transition-all' />
            </div>
        </div>
    )
}

export default ChatHeader
