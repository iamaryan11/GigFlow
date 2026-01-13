import express from "express";
import { deleteUser, getUser ,getUserStats } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const userRoute = express.Router();


userRoute.get("/stats", verifyToken, getUserStats);
userRoute.get("/:id", getUser);
userRoute.delete("/:id", verifyToken, deleteUser);

export default userRoute;