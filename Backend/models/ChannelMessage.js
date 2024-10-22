import mongoose, { Schema } from "mongoose";

const channelMessageSchema = new Schema({
    channelId: {
        type: String,
        required: true,
        ref: 'channel'
    },
    sender: {
        type: String,
        required: true,
        ref: 'user'
    },
    message: {
        type: String,
        required: true
    }
})

const channelMessageModel = mongoose.Schema('channelMessage', channelMessageSchema);

export default channelMessageModel;