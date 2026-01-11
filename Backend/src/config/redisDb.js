import dotenv from 'dotenv';
dotenv.config()
import {createClient} from 'redis';
export const redisClient=createClient({
     username:`${process.env.REDIS_USER}`,
    password:`${process.env.REDIS_PASSER}`,
    socket: {
        host:`${process.env.REDIS_HOST}`,
        port:`${process.env.REDIS_PORT}`
    }
});
redisClient.on('error',(err)=>{
    console.error('Error occured while connecting to REDIS', err);
})
redisClient.on('connect',()=>{
    console.log('REDIS connected succesfully');
})