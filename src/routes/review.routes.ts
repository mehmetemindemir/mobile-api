import { Router } from "express";
import { addReview, getReviews } from "../controllers/review.controller";
import { protect } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import {
  addReviewSchema,
  restaurantReviewsParamsSchema
} from "../validators/review.validator";

const router = Router();

router.post("/", protect, validate(addReviewSchema), addReview);
router.get("/:restaurantId", validate(restaurantReviewsParamsSchema), getReviews);

export default router;
