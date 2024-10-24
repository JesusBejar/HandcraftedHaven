import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    artworkId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product', 
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    username: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});


const Comment = mongoose.models.comments || mongoose.model('comments', commentSchema);

export default Comment;
