import { Order } from "../models/Order.model.js";
import { Gig } from "../models/Gig.model.js";
import { createError } from "../middleware/errorProvider.js";

export const createOrder = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.gigId);

    const newOrder = new Order({
      gigId: gig._id,
      img: gig.cover,
      title: gig.title,
      buyerId: req.userId,
      sellerId: gig.userId,
      price: gig.price,
      payment_intent: "temporary_mock_id_" + Math.random(), // Mocking the payment ID
      isCompleted: false, // Remains false until "payment" is confirmed
    });

    await newOrder.save();
    res.status(200).send("Order created successfully.");
  } catch (err) {
    next(err);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    // Users should only see orders they are part of (as buyer OR seller)
    const orders = await Order.find({
      $or: [{ sellerId: req.userId }, { buyerId: req.userId }],
      isCompleted: true, // Only show successful transactions
    });

    res.status(200).send(orders);
  } catch (err) {
    next(err);
  }
};