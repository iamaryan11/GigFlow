// POST /api/auth/register & login
import express from 'express'
const authRouter=express.Router();
import { register } from '../controllers/auth.controller.js';
import { createError } from '../middleware/errorProvider.js';
authRouter.post('/register',register,createError)
export default authRouter;