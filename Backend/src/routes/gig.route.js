import express from 'express'
const gigRouter=express.Router();
import { createGig,getGig } from '../controllers/gig.controller.js';
import { verifyToken } from '../middleware/jwt.js';

gigRouter.post('/publish-gigs',verifyToken,createGig)

// normal fetch gig (no filter)
// gigRouter.get('/get-gig',verifyToken,getGig)
export default gigRouter;

// http//:localhost:1111/