import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currChatUser: null,
    currChatMessages: [],
    friendChats: [],
    friendChannels: [],
}

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setCurrentChat: (state, action) => {
            state.currChatUser = action.payload
        },
        setCurrentMessages: (state, action) => {
            state.currChatMessages = action.payload
        },
        addChatMessages: (state, action) => {
            state.currChatMessages.push(action.payload);
        },
        addFriendChat: (state, action) => {
            state.friendChats = state.friendChats.filter((item) => item._id !== action.payload._id);
            state.friendChats.push(action.payload);
        },
        addFriendChannel: (state, action) => {
            state.friendChannels = state.friendChannels.filter((item) => item._id !== action.payload._id);
            state.friendChannels.push(action.payload);
        },
        removeFriendChat: (state, action) => {
            // action.pyaload --> remove userChat Id
            state.friendChats = state.friendChats.filter((item) => item._id !== action.payload);

            if (state.friendChats.length === 0) {
                state.currChatUser = null
                state.currChatMessages = []
            }
        },
        removeFriendChannel: (state, action) => {
            state.friendChannels = state.friendChannels.filter((item) => item._id !== action.payload);
        },
        resetFriendChats: (state, action) => {
            state.friendChats = [];
        },
        resetFriendChannels: (state, action) => {
            state.friendChannels = [];
        },
        logoutChat: (state, action) => {
            state.currChatUser = null
            state.currChatMessages = []
            state.friendChats = []
            state.friendChannels = []
        }
    }

})

export default chatSlice.reducer

export const { setCurrentChat, addFriendChannel, addFriendChat, removeFriendChannel, removeFriendChat, resetFriendChannels, resetFriendChats, setCurrentMessages, logoutChat, addChatMessages } = chatSlice.actions;
