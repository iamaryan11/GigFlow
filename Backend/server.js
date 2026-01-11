import dotenv from 'dotenv'
dotenv.config();
import express from 'express';
import cookieParser from 'cookie-parser';
import { redisClient } from './src/config/redisDb.js';
import { master } from './src/config/db.js';
import gigRouter from './src/routes/gig.route.js';


const app=express();



app.use(express.json());
app.use(cookieParser())


app.use('/seller',gigRouter)

// app.listen(process.env.BACKEND_PORT,()=>{
//     console.log(`Server running at port ${process.env.BACKEND_PORT}`)
// })

const Initialize_db_Connection=async()=>{
    try{
        await Promise.all([master(),redisClient.connect()]);
        console.log('Both database connected succesfully')
        app.listen(process.env.BACKEND_PORT,()=>{
            console.log(`Server listening at port: ${process.env.BACKEND_PORT}`)
        })
    }catch(err){
        console.log(`Error occured while connecting to the database ${err}`)
    }
}
Initialize_db_Connection()