import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
export const ratelimiter=rateLimit({
    windowMs:10*60*1000,
    max:50,
    message:{
        success:false,
        message:"Maximum login/register limit reached try after some time",

    },
    standardHeaders:true,
    legacyHeaders:true,
    ipv6Subnet:56,
})