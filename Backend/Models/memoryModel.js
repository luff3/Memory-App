import mongoose from 'mongoose';

const memorySchema = new mongoose.Schema({
    imageKey: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // assuming you have a User model
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Memory = mongoose.model('Memory', memorySchema);

export default Memory;
