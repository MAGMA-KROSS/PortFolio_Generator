import { Schema } from "mongoose"
import mongoose from "mongoose";
const userSchema = new Schema({
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
    createdAt: {
        type: Date,
        default: Date.now
    }

});

const User = mongoose.model('User', userSchema);