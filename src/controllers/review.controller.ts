import { Request, Response } from "express";
import Review from "../models/Review";

export const addReview = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const review = await Review.create({
    ...req.body,
    userId: req.user.id
  });

  res.status(201).json(review);
};

export const getReviews = async (req: Request, res: Response) => {
  const reviews = await Review.find({
    restaurantId: req.params.restaurantId
  });
  res.json(reviews);
};
