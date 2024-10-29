import mongoose from 'mongoose';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {ObjectId} from "mongodb";

const productSchema = new mongoose.Schema({
    idSeller: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', 
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    price: {
        type: Number,
        required: true,
    },
});


const Product = mongoose.models.products ||mongoose.model('products', productSchema);

export default Product;
