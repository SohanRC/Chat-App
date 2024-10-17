import axios from "axios"
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;


class ChatService {

    async getChats(senderId, recipentId) {
        try {
            return await axios.post(`/chat/getChats`, {
                senderId,
                recipentId
            }, {
                withCredentials: true
            })
        } catch (error) {
            return error;
        }
    }

    async addContact(userId, friendId) {
        try {
            return await axios.post(`/chat/addContact`, {
                userId,
                friendId
            }, {
                withCredentials: true
            })
        } catch (error) {
            return error;
        }
    }

    async removeContact(userId, friendId) {
        try {
            return await axios.post(`/chat/removeContact`, {
                userId,
                friendId
            }, {
                withCredentials: true
            })
        } catch (error) {
            return error;
        }
    }

    async getAllContacts(userId) {
        try {
            return await axios.post(`/chat/getContacts`, {
                userId
            }, { withCredentials: true })
        } catch (error) {
            return error;
        }
    }
}

const chatService = new ChatService(); // object creation

export default chatService;