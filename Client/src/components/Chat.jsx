
import React, { useEffect, useState } from 'react'
import authService from '../Services/AuthService.js';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { login, logout } from '../store/slices/userSlice.js';
import { ChatLayout, Loader } from "./index.js"

const Chat = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // getuserinfo when chat page laoded
    useEffect(() => {

        const getUserInfo = async () => {
            setLoading(true)
            try {
                const result = await authService.getUserInfo();
                setLoading(false);
                if (!result.data) {
                    // error
                    const { response: { data: { message } } } = result;
                    toast.error(message);
                    dispatch(logout());
                    navigate('/auth');
                }
                else {
                    // success
                    const { data: { userDetails } } = result;
                    dispatch(login(userDetails));
                    setLoading(false);
                }
            } catch (error) {
                console.log(error);
                setLoading(false);
                dispatch(logout());
                navigate('/auth');
            }
        }

        getUserInfo();

    }, [])

    if (loading) return (
        <Loader />
    )

    return <ChatLayout />

    // return (user) ? (
    //     <ChatLayout />
    // ) : <><h1>Could not fetch User Details ! Try Again !</h1></>
}

export default Chat
