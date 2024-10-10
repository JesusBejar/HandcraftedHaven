import mongoose from "mongoose";
import {ObjectId} from "mongodb";

let userSchema = new mongoose.Schema({
_id: {type: ObjectId, auto: true},
username:{
    type: String,
    required: true
},
email:{
    type: String,
    required: true,
    unique: true
},
password:{
   type: String,
   required: true 
}  
})

const User = mongoose.models.users || mongoose.model('users', userSchema);


export default User;
