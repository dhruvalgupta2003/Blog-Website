import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true // ensure unique email addresses
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
    blogs:[
        {   
            blogId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Blog' // Reference to Blog model
            }
        }
    ],
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date
},{timestamps: true})

export const User = mongoose.model('User',userSchema);