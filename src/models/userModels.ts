import mongoose from 'mongoose';

const sellerDetailsSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    business_name: {
        type: String,
        required: true,
    },
    bus_description: {
        type: String,
        required: true,
    },
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, 
    },
    password: {
        type: String,
        required: true,
    },
    profile_img: {
        type: String,
        default: 'default.png', 
    },
    profile_description: {
        type: String,
        default: '', 
    },
    seller_details: sellerDetailsSchema, 
}, { timestamps: true }); 


const User = mongoose.models.users || mongoose.model('users', userSchema);

export default User;
