import mongoose from 'mongoose';

const starSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'products', // reference to Product model
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', // reference to User model
    }
}, {
    timestamps: true, 
});

const Star = mongoose.models.stars || mongoose.model('stars', starSchema);

export default Star;
