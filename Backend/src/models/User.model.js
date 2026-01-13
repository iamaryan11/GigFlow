import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        default: "https://i.ibb.co/4pDNDk1/avatar.png"
    },
   country: {
    type: String,
    required: false, 
    default: "Global"
},
    phone: {
        type: String,
    },
    desc: {
        type: String,
    },
    isSeller: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);