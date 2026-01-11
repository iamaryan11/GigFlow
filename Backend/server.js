import dotenv from 'dotenv'
dotenv.config();
import express from 'express';
const app=express();




app.listen(process.env.BACKEND_PORT,()=>{
    console.log(`Server running at port ${process.env.BACKEND_PORT}`)
})

