import express from 'express'
const gigRouter=express.Router();
import { createGig } from '../controllers/gig.controller.js';
import { verifyToken } from '../middleware/jwt.js';

gigRouter.post('/publish-gigs',verifyToken,createGig)

export default gigRouter;

// http//:localhost:1111/