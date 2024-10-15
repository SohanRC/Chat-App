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
}

const chatService = new ChatService(); // object creation

export default chatService;