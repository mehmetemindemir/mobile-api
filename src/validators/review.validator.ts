import { z } from "zod";

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid id");

export const addReviewSchema = {
  body: z.object({
    restaurantId: objectId,
    rating: z.number().min(1).max(5),
    comment: z.string().trim().min(1).max(1000)
  })
};

export const restaurantReviewsParamsSchema = {
  params: z.object({
    restaurantId: objectId
  })
};
