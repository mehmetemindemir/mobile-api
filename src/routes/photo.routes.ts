import { Router } from "express";
import { uploadPhoto, getPhotos } from "../controllers/photo.controller";
import { protect } from "../middleware/auth.middleware";
import { upload } from "../middleware/upload.middleware";
import { validate } from "../middleware/validate.middleware";
import {
  restaurantPhotosParamsSchema,
  uploadPhotoSchema
} from "../validators/photo.validator";

const router = Router();

router.post(
  "/",
  protect,
  upload.single("image"),
  validate(uploadPhotoSchema),
  uploadPhoto
);
router.get("/:restaurantId", validate(restaurantPhotosParamsSchema), getPhotos);

export default router;
