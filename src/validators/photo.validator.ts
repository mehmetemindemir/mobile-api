import { z } from "zod";

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid id");

export const uploadPhotoSchema = {
  body: z.object({
    restaurantId: objectId
  })
};

export const restaurantPhotosParamsSchema = {
  params: z.object({
    restaurantId: objectId
  })
};
