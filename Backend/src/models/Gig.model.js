import mongoose from 'mongoose';
const { Schema } = mongoose;

const gigSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    desc: {
        type: String,
        required: true,
    },
    totalStars: {
        type: Number,
        default: 0,
    },
    starNumber: {
        type: Number,
        default: 0,
    },
    cat: {
        type: String,
        required: true,
        index: true, // Speeds up search by category
    },
    price: {
        type: Number,
        required: true,
        min: 1,
    },
    cover: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
    },
    shortTitle: {
        type: String,
        required: true,
    },
    shortDesc: {
        type: String,
        required: true,
    },
    deliveryTime: {
        type: Number,
        required: true,
    },
    revisionNumber: {
        type: Number,
        required: true,
    },
    features: {
        type: [String],
    },
    sales: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

export const Gig = mongoose.model('Gig', gigSchema);