import { Order } from "../models/Order.model.js";
import { Gig } from "../models/Gig.model.js";
import { createError } from "../middleware/errorProvider.js";
export const createOrder = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.gigId);

    const intentId = "mock_success_" + Date.now();

    const newOrder = new Order({
      gigId: gig._id,
      img: gig.cover,
      title: gig.title,
      buyerId: req.userId,
      sellerId: gig.userId,
      price: gig.price,
      payment_intent: intentId, // Save it
      isCompleted: false,
    });

    await newOrder.save();
    res.status(200).send({ payment_intent: intentId });
  } catch (err) {
    next(err);
  }
};

export const confirmOrder = async (req, res, next) => {
  try {
    const order = await Order.findOneAndUpdate(
      { payment_intent: req.body.payment_intent },
      { $set: { isCompleted: true } },
      { new: true } 
    );

    if (!order)
      return next(createError(404, "Order not found or already confirmed."));
    await Gig.findByIdAndUpdate(order.gigId, {
      $inc: { sales: 1 }, 
    });

    res.status(200).send("Order confirmed and stats updated.");
  } catch (err) {
    next(err);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({
      ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
      isCompleted: true,
    });

    res.status(200).send(orders);
  } catch (err) {
    next(err);
  }
};
