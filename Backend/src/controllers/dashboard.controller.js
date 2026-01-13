import { Order } from "../models/Order.model.js";
import { Gig } from "../models/Gig.model.js";

export const getSellerStats = async (req, res, next) => {
  try {
    const stats = await Order.aggregate([
      { $match: { sellerId: req.userId, isCompleted: true } },
      {
        $group: {
          _id: null,
          totalEarnings: { $sum: "$price" },
          totalSales: { $sum: 1 },
        },
      },
    ]);
    const gigCount = await Gig.countDocuments({ userId: req.userId });

    res.status(200).send({
      earnings: stats[0]?.totalEarnings || 0,
      sales: stats[0]?.totalSales || 0,
      activeGigs: gigCount,
    });
  } catch (err) {
    next(err);
  }
};
