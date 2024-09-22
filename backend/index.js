import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db/connectDB.js';
import authRoutes from './routes/auth.routes.js'
dotenv.config()

const app = express();
app.use(express.json())

const PORT = process.env.PORT

// routes
app.use('/api/auth',authRoutes)

// server
app.listen(PORT,() => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
})

