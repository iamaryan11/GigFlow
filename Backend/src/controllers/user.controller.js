import mongoose from "mongoose";
import { User } from "../models/User.model.js";
import { createError } from "../middleware/errorProvider.js";
import { Order } from "../models/Order.model.js";
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return next(createError(404, "User not found!"));
    const { password, ...info } = user._doc;
    res.status(200).send(info);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (req.userId !== user._id.toString()) {
    return next(createError(403, "You can delete only your account!"));
  }
  await User.findByIdAndDelete(req.params.id);
  res.status(200).send("deleted.");
};

export const getUserStats = async (req, res, next) => {
  try {
    const stats = await Order.aggregate([
      {
        $match: {
          sellerId: new mongoose.Types.ObjectId(req.userId),
          isCompleted: true,
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$price" },
          totalSales: { $sum: 1 },
          statusPending: { $sum: "status" },
        },
      },
    ]);

    res.status(200).send(stats[0] || { totalRevenue: 0, totalSales: 0 });
  } catch (err) {
    next(err); 
  }
};
