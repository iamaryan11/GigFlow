import { User } from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createError } from "../middleware/errorProvider.js";

export const register = async (req, res, next) => {
    try {
        // 1. Check if user already exists
        const existingUser = await User.findOne({ 
            $or: [{ email: req.body.email }, { username: req.body.username }] 
        });
        if (existingUser) return next(createError(409, "User already exists!"));

        // 2. Hash Password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        // 3. Create and Save User
        const newUser = new User({
            ...req.body,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).send("User has been created successfully!");
    } catch (err) {
        next(err); 
    }
};

export const login = async (req, res, next) => {
    try {
        // 1. Find User
        const user = await User.findOne({ username: req.body.username });
        if (!user) return next(createError(404, "User not found!"));

        // 2. Check Password
        const isCorrect = bcrypt.compareSync(req.body.password, user.password);
        if (!isCorrect) return next(createError(400, "Wrong password or username!"));

        // 3. Create JWT
        const token = jwt.sign(
            { id: user._id, isSeller: user.isSeller },
            process.env.JWT_KEY,
            { expiresIn: "24h" } // Reasonable expiration for a demo
        );

        // 4. Remove password from response for security
        const { password, ...info } = user._doc;

        // 5. Set Cookie and send response
        res.cookie("accessToken", token, {
            httpOnly: true, // Prevents XSS attacks
            secure: process.env.NODE_ENV === "production", // Only over HTTPS in prod
            sameSite: "none", // Required for cross-site cookies
        })
        .status(200)
        .send(info);
    } catch (err) {
        next(err);
    }
};

export const logout = async (req, res) => {
    res.clearCookie("accessToken", {
        sameSite: "none",
        secure: true,
    })
    .status(200)
    .send("User has been logged out.");
};