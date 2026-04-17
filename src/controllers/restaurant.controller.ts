import { Request, Response } from "express";
import Restaurant from "../models/Restaurant";

export const addRestaurant = async (req: Request, res: Response) => {
  const { name, description, address, lat, lng, images = [] } = req.body as {
    name: string;
    description: string;
    address: string;
    lat: number;
    lng: number;
    images?: string[];
  };

  const restaurant = await Restaurant.create({
    name,
    description,
    address,
    location: {
      type: "Point",
      coordinates: [lng, lat]
    },
    images
  });

  res.status(201).json(restaurant);
};

export const getRestaurants = async (_req: Request, res: Response) => {
  const data = await Restaurant.find();
  res.json(data);
};

export const getNearby = async (req: Request, res: Response) => {
  const { lat, lng } = req.query as unknown as { lat: number; lng: number };

  const data = await Restaurant.find({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [lng, lat]
        },
        $maxDistance: 5000
      }
    }
  });

  res.json(data);
};
