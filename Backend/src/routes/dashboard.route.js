import express from 'express';
import { getSellerStats } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const dashRouter=express.Router();
dashRouter.get("/stats", verifyToken, getSellerStats);
export default dashRouter;