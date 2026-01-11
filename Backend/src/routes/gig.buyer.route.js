import express from 'express';
const gigBuyerRouter=express.Router();
import { createGig,getGig } from '../controllers/gig.controller.js';
import { verifyToken } from '../middleware/jwt.js';

// normal fetch gig (no filter)
gigBuyerRouter.get('/gig/:id',verifyToken,getGig)

export default gigBuyerRouter;