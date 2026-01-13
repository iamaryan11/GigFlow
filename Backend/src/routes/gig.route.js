import express from 'express'
const gigRouter=express.Router();
import { createGig,getGig ,deleteGig} from '../controllers/gig.controller.js';
import { verifyToken } from '../middleware/jwt.js';

gigRouter.post('/publish-gigs',verifyToken,createGig)
gigRouter.delete("/:id", verifyToken, deleteGig);

export default gigRouter;
