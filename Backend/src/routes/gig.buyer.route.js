import express from 'express';
const gigBuyerRouter=express.Router();
import { createGig,getGig, getGigs } from '../controllers/gig.controller.js';
import { verifyToken } from '../middleware/jwt.js';
gigBuyerRouter.get('/gig/:id',getGig)
gigBuyerRouter.get('/', getGigs);

export default gigBuyerRouter;