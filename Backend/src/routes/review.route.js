import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import { createReview, getReviews } from "../controllers/review.controller.js";

const reviewRoute = express.Router();

reviewRoute.post("/", verifyToken, createReview);
reviewRoute.get("/:gigId", getReviews);

export default reviewRoute;