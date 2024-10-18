import { createContext, useContext, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { io } from 'socket.io-client'
import { addChatMessages, addFriendChat, removeFriendChat } from '../store/slices/chatSlice';

const socketContext = createContext(null);

export const useSocket = () => {
    return useContext(socketContext);
}

export const SocketProvider = ({ children }) => {

    const socket = useRef();
    const userInfo = useSelector((state) => state.user.userInfo);
    const currentChatMessages = useSelector((state) => state.chat.currChatMessages);
    const dispatch = useDispatch();


    useEffect(() => {
        if (userInfo) {
            socket.current = io(import.meta.env.VITE_BACKEND_HOST, {
                withCredentials: true,
                query: {
                    userId: userInfo._id,
                }
            })

            socket.current.on("connect", () => {
                console.log(`Connected to socket server`);
            })

            const handleReceiveMessage = async (message) => {
                dispatch(addChatMessages(message));
            }
            socket.current.on('receiveMessage', handleReceiveMessage);

            const addFriend = async ({ friend }) => {
                dispatch(addFriendChat(friend));
            }
            socket.current.on('addFriend', addFriend);

            const removeFriend = async ({ friendId }) => {
                console.log("Event received : ", friendId);
                dispatch(removeFriendChat(friendId));
            }

            socket.current.on('removeFriend', removeFriend);
        }


        return () => {
            socket.current?.disconnect();
        }
    }, [userInfo])



    return (
        <socketContext.Provider value={{ socket }}>
            {children}
        </socketContext.Provider>
    )
}