import { z } from "zod";

export const addRestaurantSchema = {
  body: z.object({
    name: z.string().trim().min(2).max(100),
    description: z.string().trim().min(1).max(1000),
    address: z.string().trim().min(3).max(300),
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180),
    images: z.array(z.string().url()).optional().default([])
  })
};

export const nearbyQuerySchema = {
  query: z.object({
    lat: z.coerce.number().min(-90).max(90),
    lng: z.coerce.number().min(-180).max(180)
  })
};
