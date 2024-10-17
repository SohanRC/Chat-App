import MessageModel from "../models/MessageModel.js";
import friendModel from "../models/FriendModel.js";



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

const addContact = async (req, res, next) => {
    try {
        const { userId, friendId } = req.body;

        await friendModel.updateOne(
            { userId },
            { $addToSet: { friendConnections: friendId } },
            { upsert: true }
        )

        await friendModel.updateOne(
            { userId: friendId },
            { $addToSet: { friendConnections: userId } },
            { upsert: true }
        )

        await MessageModel.deleteMany({
            $or: [
                { sender: userId, recipent: friendId },
                { sender: friendId, recipent: userId },
            ]
        })

        return res.status(200).json({
            success: true,
            message: "User added as friend !"
        })
    } catch (error) {
        next(error);
    }
}

const removeContact = async (req, res, next) => {
    try {
        const { userId, friendId } = req.body;
        console.log(userId, friendId);

        await friendModel.updateOne(
            { userId },
            { $pull: { friendConnections: friendId } },
            { upsert: true }
        )

        await friendModel.updateOne(
            { userId: friendId },
            { $pull: { friendConnections: userId } },
            { upsert: true }
        )

        return res.status(200).json({
            success: true,
            message: "User removed as friend !"
        })
    } catch (error) {
        next(error);
    }
}

const getAllContacts = async (req, res, next) => {
    try {
        const { userId } = req.body;
        const result = await friendModel.findOne({ userId }).populate('friendConnections');
        console.log(result);

        return res.status(200).json({
            success: true,
            message: "All Friends fetched !",
            friendConnections: result?.friendConnections || [],
        })
    } catch (error) {
        next(error)
    }
}


export { getChats, addContact, getAllContacts, removeContact }