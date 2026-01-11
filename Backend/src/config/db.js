import mongoose from 'mongoose'
export async function master(){
    await mongoose.connect(process.env.DB_URI)
}