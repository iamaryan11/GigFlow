// POST /api/auth/register & login
import express from 'express'
const authRouter=express.Router();
import { register,login,logout } from '../controllers/auth.controller.js';
import { createError } from '../middleware/errorProvider.js';
import { verifyToken } from '../middleware/jwt.js';
authRouter.post('/register',register,createError);
authRouter.post('/login',login);
authRouter.post('/logout',verifyToken,logout);
export default authRouter;