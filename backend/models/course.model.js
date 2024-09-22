import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    thumbnail:{
        type: String,
        required: true
    },
    tags:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: String,
        required: true
    },
    creatorId: String,

})

export const Course = mongoose.model("Course", courseSchema);