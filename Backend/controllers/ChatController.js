import MessageModel from "../models/MessageModel.js";



const getChats = async (req, res, next) => {
    try {
        const { senderId, recipentId } = req.body;
        const chats = await MessageModel.find({
            $and: [
                { sender: [senderId, recipentId] },
                { recipent: [senderId, recipentId] },
            ]
        }).sort({ createdAt: 1 })

        return res.status(200).json({
            success: true,
            chatMessages: chats
        })
    } catch (error) {
        next(error)
    }
}


export { getChats }