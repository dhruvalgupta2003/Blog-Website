import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to user model
        required: true
    },
    text:{
        type: String,
        required: true,
        trim: true,
        maxLength: 1000
    },
},{timestamps: true})

const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true,
        maxLength: 200
    },
    thumbnail:{
        type: String,
        required: true
    },
    tags:{
        type: [String],
        required: true,
        validate: {
            validator: (v) => Array.isArray(v) && v.length > 0,
            message: 'At least one tag is required'
        }
    },
    description:{
        type: String,
        required: true,
        trim: true,
        maxLength: 500
    },
    blogContent:[
        {
            type: String, // can be text or input images ... etc
            contentType: {
                type: String, // To differentiate between text and images
                enum: ['text','image'], // enums to restrict the type of content
                required: true
            }
        }
    ],
    creatorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to user model
        required: true // ensures every blog has a creator
    },
    comments: [commentSchema], // Embed comment Schema directly into blogs schema
    likes:[{
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User' // Reference to user model for likes
        }
    }]

})

export const Blog = mongoose.model("Blog", blogSchema);