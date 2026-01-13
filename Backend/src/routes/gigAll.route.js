import express from 'express'
const getAllGigRoute=express.Router();
import { createGig,getGig ,getGigs} from '../controllers/gig.controller.js';

getAllGigRoute.get('/gigs',getGigs)
export default getAllGigRoute;