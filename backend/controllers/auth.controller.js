import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

// signup controller
export const singup = async(req,res) => {
    const { email, password, username } = req.body;
    try {
        const isUserAlreadyExists = await User.findOne({email})
        if(isUserAlreadyExists){
            return res.status(400).json({sucess: false, message: "User Already Exists!"})
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000)
        const user = new User({
            email,
            password:hashedPassword,
            username,
            verificationToken:verificationToken,
            verificationTokenExpiresAt: Date.now() * 24 * 60 * 60 * 1000 // 24 HOURS
        })
        await user.save();

        // jwt token and set cookie
        generateTokenAndSetCookie(res, user._id);
    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}