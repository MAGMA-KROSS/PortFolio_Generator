import { Schema , model} from "mongoose"
import mongoose from "mongoose";
import { object } from "zod";

enum UserRole{
    Admin = 'admin',
    User = 'user'
}

interface User{
    name: String,
    email: String,
    password: String,
    role: UserRole,
    createdAt?: Date
}
const userSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
         
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role:{
        type: String,
        enum: UserRole,
        default: UserRole.User,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});

const User = mongoose.model('User', userSchema);
export default User;