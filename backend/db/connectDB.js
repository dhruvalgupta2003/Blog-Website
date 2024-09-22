import mongoose from "mongoose";

export const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Conencted to MongoDB: ${conn.connection.host}`)
    } catch (error) {
        console.error(`Error in connecting to MongoDB: ${error.message}`);
        process.exit(1); // 1 for failure , 0 for success
    }
}