import { Request, Response } from "express";
import Photo from "../models/Photo";
import cloudinary from "../config/cloudinary";
import toBase64DataUri from "../utils/cloudinary";

export const uploadPhoto = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!req.file) {
    return res.status(400).json({ message: "Image file is required" });
  }

  const uploadResult = await cloudinary.uploader.upload(toBase64DataUri(req.file), {
    folder: "mobile-api/photos"
  });

  const photo = await Photo.create({
    userId: req.user.id,
    restaurantId: req.body.restaurantId,
    imageUrl: uploadResult.secure_url,
    publicId: uploadResult.public_id
  });

  res.status(201).json(photo);
};

export const getPhotos = async (req: Request, res: Response) => {
  const photos = await Photo.find({
    restaurantId: req.params.restaurantId
  });
  res.json(photos);
};
