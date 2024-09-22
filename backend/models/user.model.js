import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    avatar:{
        public_id: String,
        url: String,
    },
    role:{
        type: String,
        default: "user"
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    lastLogin:{
        type: Date,
        default: Date.now
    },
    courses:[
        {   
            courseId: String
        }
    ],
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date
},{timestamps: true})

export const User = mongoose.model('User',userSchema);