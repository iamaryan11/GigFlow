import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import { getOrders, createOrder, confirmOrder } from "../controllers/order.controller.js";

const orderRoute = express.Router();
orderRoute.post("/:gigId", verifyToken, createOrder);
orderRoute.get("/", verifyToken, getOrders);
orderRoute.put("/", verifyToken, confirmOrder);

export default orderRoute;