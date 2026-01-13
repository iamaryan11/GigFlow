import { Review } from "../models/Review.model.js";
import { Gig } from "../models/Gig.model.js";
import { createError } from "../middleware/errorProvider.js";

export const createReview = async (req, res, next) => {
  if (req.isSeller)
    return next(createError(403, "Sellers cannot create reviews!"));

  try {
    const existingReview = await Review.findOne({
      gigId: req.body.gigId,
      userId: req.userId,
    });
    if (existingReview)
      return next(createError(403, "You have already reviewed this gig!"));

    const newReview = new Review({
      userId: req.userId,
      gigId: req.body.gigId,
      star: req.body.star,
      desc: req.body.desc,
    });

    const savedReview = await newReview.save();

    await Gig.findByIdAndUpdate(req.body.gigId, {
      $inc: { totalStars: req.body.star, starNumber: 1 },
    });

    res.status(201).send(savedReview);
  } catch (err) {
    next(err);
  }
};

export const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ gigId: req.params.gigId }).populate(
      "userId",
      "username img country"
    );
    res.status(200).send(reviews);
  } catch (err) {
    next(err);
  }
};
