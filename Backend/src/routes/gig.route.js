import express from 'express'
const gigRouter=express.Router();
import { createGig } from '../controllers/gig.controller.js';

gigRouter.post('/publish-gigs',createGig)

export default gigRouter;

// http//:localhost:1111/